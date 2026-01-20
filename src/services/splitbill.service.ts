import { supabase } from "@/lib/supabase";

// Types (we'll add to database.types.ts later when migration is run)
interface SplitGroup {
  id: string;
  name: string;
  description: string | null;
  created_by: string;
  currency: string;
  status: "active" | "settled" | "archived";
  created_at: string;
  updated_at: string;
  settled_at: string | null;
}

interface GroupMember {
  id: string;
  group_id: string;
  user_id: string | null;
  name: string;
  email: string | null;
  avatar_url: string | null;
  is_owner: boolean;
  joined_at: string;
}

interface GroupExpense {
  id: string;
  group_id: string;
  description: string;
  amount: number;
  currency: string;
  paid_by: string;
  expense_date: string;
  category: string | null;
  receipt_url: string | null;
  split_type: "equal" | "percentage" | "exact" | "shares";
  notes: string | null;
  created_at: string;
  updated_at: string;
}

interface ExpenseSplit {
  id: string;
  expense_id: string;
  member_id: string;
  amount: number;
  percentage: number | null;
  shares: number | null;
  paid: boolean;
  created_at: string;
}

interface GroupWithDetails extends SplitGroup {
  group_members: GroupMember[];
  group_expenses: (GroupExpense & { expense_splits: ExpenseSplit[] })[];
}

interface Balance {
  memberId: string;
  memberName: string;
  balance: number; // Positive = owed, Negative = owes
}

interface Debt {
  from: string;
  fromName: string;
  to: string;
  toName: string;
  amount: number;
}

export const splitBillService = {
  /**
   * Get all groups for a user
   */
  async getGroups(userId: string) {
    const { data, error } = await supabase
      .from("split_groups")
      .select(
        `
        *,
        group_members (*)
      `,
      )
      .or(`created_by.eq.${userId},group_members.user_id.eq.${userId}`)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as (SplitGroup & { group_members: GroupMember[] })[];
  },

  /**
   * Get single group with all details
   */
  async getGroupById(groupId: string) {
    const { data, error } = await supabase
      .from("split_groups")
      .select(
        `
        *,
        group_members (*),
        group_expenses (
          *,
          expense_splits (*)
        )
      `,
      )
      .eq("id", groupId)
      .single();

    if (error) throw error;
    return data as GroupWithDetails;
  },

  /**
   * Create a new group
   */
  async createGroup(
    name: string,
    description: string,
    createdBy: string,
    memberNames: string[],
  ) {
    // Create group
    const { data: group, error: groupError } = await supabase
      .from("split_groups")
      .insert({
        name,
        description,
        created_by: createdBy,
      })
      .select()
      .single();

    if (groupError) throw groupError;

    // Add creator as owner member
    const { data: ownerMember, error: ownerError } = await supabase
      .from("group_members")
      .insert({
        group_id: group.id,
        user_id: createdBy,
        name: "Me",
        is_owner: true,
      })
      .select()
      .single();

    if (ownerError) throw ownerError;

    // Add other members
    if (memberNames.length > 0) {
      const members = memberNames.map((name) => ({
        group_id: group.id,
        name,
        is_owner: false,
      }));

      const { error: membersError } = await supabase
        .from("group_members")
        .insert(members);

      if (membersError) throw membersError;
    }

    return this.getGroupById(group.id);
  },

  /**
   * Update group
   */
  async updateGroup(
    groupId: string,
    updates: { name?: string; description?: string; status?: string },
  ) {
    const { data, error } = await supabase
      .from("split_groups")
      .update(updates)
      .eq("id", groupId)
      .select()
      .single();

    if (error) throw error;
    return data as SplitGroup;
  },

  /**
   * Delete group
   */
  async deleteGroup(groupId: string) {
    const { error } = await supabase
      .from("split_groups")
      .delete()
      .eq("id", groupId);

    if (error) throw error;
  },

  /**
   * Add member to group
   */
  async addMember(groupId: string, name: string, email?: string) {
    const { data, error } = await supabase
      .from("group_members")
      .insert({
        group_id: groupId,
        name,
        email: email || null,
      })
      .select()
      .single();

    if (error) throw error;
    return data as GroupMember;
  },

  /**
   * Remove member from group
   */
  async removeMember(memberId: string) {
    const { error } = await supabase
      .from("group_members")
      .delete()
      .eq("id", memberId);

    if (error) throw error;
  },

  /**
   * Add expense to group
   */
  async addExpense(
    groupId: string,
    description: string,
    amount: number,
    paidBy: string,
    splitBetween: string[],
    expenseDate: string,
    category?: string,
    splitType: "equal" | "percentage" | "exact" | "shares" = "equal",
  ) {
    // Create expense
    const { data: expense, error: expenseError } = await supabase
      .from("group_expenses")
      .insert({
        group_id: groupId,
        description,
        amount,
        paid_by: paidBy,
        expense_date: expenseDate,
        category: category || null,
        split_type: splitType,
      })
      .select()
      .single();

    if (expenseError) throw expenseError;

    // Calculate splits
    const splitAmount = amount / splitBetween.length;
    const splits = splitBetween.map((memberId) => ({
      expense_id: expense.id,
      member_id: memberId,
      amount: splitAmount,
    }));

    // Create splits
    const { error: splitsError } = await supabase
      .from("expense_splits")
      .insert(splits);

    if (splitsError) throw splitsError;

    return this.getGroupById(groupId);
  },

  /**
   * Delete expense
   */
  async deleteExpense(expenseId: string) {
    const { error } = await supabase
      .from("group_expenses")
      .delete()
      .eq("id", expenseId);

    if (error) throw error;
  },

  /**
   * Calculate balances for all members in a group
   */
  calculateBalances(group: GroupWithDetails): Balance[] {
    const balances = new Map<string, { name: string; balance: number }>();

    // Initialize balances for all members
    group.group_members.forEach((member) => {
      balances.set(member.id, { name: member.name, balance: 0 });
    });

    // Process each expense
    group.group_expenses.forEach((expense) => {
      // Person who paid gets credited
      const payer = balances.get(expense.paid_by);
      if (payer) {
        payer.balance += expense.amount;
      }

      // People who owe get debited
      expense.expense_splits.forEach((split) => {
        const member = balances.get(split.member_id);
        if (member) {
          member.balance -= split.amount;
        }
      });
    });

    return Array.from(balances.entries()).map(([memberId, data]) => ({
      memberId,
      memberName: data.name,
      balance: data.balance,
    }));
  },

  /**
   * Calculate who owes whom
   */
  calculateDebts(balances: Balance[]): Debt[] {
    const debts: Debt[] = [];

    // Separate creditors (balance > 0) and debtors (balance < 0)
    const creditors = balances
      .filter((b) => b.balance > 0)
      .sort((a, b) => b.balance - a.balance);
    const debtors = balances
      .filter((b) => b.balance < 0)
      .sort((a, b) => a.balance - b.balance);

    let i = 0,
      j = 0;

    while (i < creditors.length && j < debtors.length) {
      const creditor = creditors[i];
      const debtor = debtors[j];

      const settleAmount = Math.min(creditor.balance, Math.abs(debtor.balance));

      if (settleAmount > 0.01) {
        // Avoid floating point issues
        debts.push({
          from: debtor.memberId,
          fromName: debtor.memberName,
          to: creditor.memberId,
          toName: creditor.memberName,
          amount: settleAmount,
        });
      }

      creditor.balance -= settleAmount;
      debtor.balance += settleAmount;

      if (Math.abs(creditor.balance) < 0.01) i++;
      if (Math.abs(debtor.balance) < 0.01) j++;
    }

    return debts;
  },

  /**
   * Get group summary
   */
  async getGroupSummary(groupId: string) {
    const group = await this.getGroupById(groupId);

    const totalExpenses = group.group_expenses.reduce(
      (sum, exp) => sum + exp.amount,
      0,
    );

    const balances = this.calculateBalances(group);
    const debts = this.calculateDebts(balances);

    return {
      group,
      totalExpenses,
      expenseCount: group.group_expenses.length,
      memberCount: group.group_members.length,
      balances,
      debts,
    };
  },

  /**
   * Settle up group
   */
  async settleGroup(groupId: string) {
    const { data, error } = await supabase
      .from("split_groups")
      .update({
        status: "settled",
        settled_at: new Date().toISOString(),
      })
      .eq("id", groupId)
      .select()
      .single();

    if (error) throw error;
    return data as SplitGroup;
  },
};
