import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

// --- Types ---
export interface Member {
  id: string;
  name: string;
  avatar?: string; // Optional URL or local asset
}

export interface Split {
  memberId: string;
  amount: number;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string; // Member ID
  date: string; // ISO date string
  splitBetween: string[]; // List of Member IDs included in the split
  splits?: Split[]; // Optional detailed splits (if we do uneven splitting later)
}

export interface Group {
  id: string;
  name: string;
  members: Member[];
  expenses: Expense[];
  currency: string;
}

interface SplitBillContextType {
  groups: Group[];
  currentGroup: Group | null;
  isLoading: boolean;
  createGroup: (name: string, members: string[]) => Promise<void>;
  selectGroup: (groupId: string) => void;
  addExpense: (
    groupId: string,
    description: string,
    amount: number,
    paidBy: string,
    splitBetween: string[],
  ) => Promise<void>;
  getGroupBalances: (groupId: string) => Record<string, number>;
  getDebts: (groupId: string) => { from: string; to: string; amount: number }[];
  settleUp: (groupId: string) => Promise<void>;
  deleteGroup: (groupId: string) => Promise<void>;
  deleteExpense: (groupId: string, expenseId: string) => Promise<void>;
  addMember: (groupId: string, name: string) => Promise<void>;
  removeMember: (groupId: string, memberId: string) => Promise<void>;
}

// --- Context ---
const SplitBillContext = createContext<SplitBillContextType | undefined>(
  undefined,
);

export const useSplitBill = () => {
  const context = useContext(SplitBillContext);
  if (!context) {
    throw new Error("useSplitBill must be used within a SplitBillProvider");
  }
  return context;
};

// --- Provider ---
export const SplitBillProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [currentGroup, setCurrentGroup] = useState<Group | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const STORAGE_KEY = "@splitbill_groups";

  // Load from storage on mount
  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setGroups(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load groups", e);
    } finally {
      setIsLoading(false);
    }
  };

  const saveGroups = async (newGroups: Group[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newGroups));
      setGroups(newGroups);
    } catch (e) {
      console.error("Failed to save groups", e);
    }
  };

  const createGroup = async (name: string, memberNames: string[]) => {
    const newMembers: Member[] = memberNames.map((name, index) => ({
      id: `${Date.now()}-${index}`,
      name: name.trim(),
      // Assign a random avatar color or placeholder if needed later
    }));

    const currentUser: Member = { id: "user-me", name: "You" };

    const hasMe = newMembers.some((m) => m.name.toLowerCase() === "you");
    const finalMembers = hasMe ? newMembers : [currentUser, ...newMembers];

    const newGroup: Group = {
      id: Date.now().toString(),
      name,
      members: finalMembers,
      expenses: [],
      currency: "$",
    };

    const updatedGroups = [...groups, newGroup];
    await saveGroups(updatedGroups);
  };

  const selectGroup = (groupId: string) => {
    const group = groups.find((g) => g.id === groupId);
    setCurrentGroup(group || null);
  };

  const addExpense = async (
    groupId: string,
    description: string,
    amount: number,
    paidBy: string,
    splitBetween: string[],
  ) => {
    const groupIndex = groups.findIndex((g) => g.id === groupId);
    if (groupIndex === -1) return;

    const newExpense: Expense = {
      id: Date.now().toString(),
      description,
      amount,
      paidBy,
      date: new Date().toISOString(),
      splitBetween,
    };

    const updatedGroups = [...groups];
    const updatedGroup = {
      ...updatedGroups[groupIndex],
      expenses: [...updatedGroups[groupIndex].expenses, newExpense],
    };
    updatedGroups[groupIndex] = updatedGroup;

    await saveGroups(updatedGroups);
    if (currentGroup?.id === groupId) {
      setCurrentGroup(updatedGroup);
    }
  };

  const getGroupBalances = (groupId: string) => {
    const group = groups.find((g) => g.id === groupId);
    if (!group) return {};

    const balances: Record<string, number> = {};

    // Initialize all members to 0
    group.members.forEach((m) => (balances[m.id] = 0));

    group.expenses.forEach((expense) => {
      const paidBy = expense.paidBy;
      const amount = expense.amount;
      const splitCount = expense.splitBetween.length;

      if (splitCount === 0) return;

      const sharePerPerson = amount / splitCount;

      // Each person who is in the split owes their share
      expense.splitBetween.forEach((memberId) => {
        if (balances[memberId] === undefined) balances[memberId] = 0;
        balances[memberId] -= sharePerPerson;
      });

      // The payer gets credit for paying the full amount
      if (balances[paidBy] === undefined) balances[paidBy] = 0;
      balances[paidBy] += amount;
    });

    return balances;
  };

  const settleUp = async (groupId: string) => {
    // A simple way to clear expenses for demo purposes
    const groupIndex = groups.findIndex((g) => g.id === groupId);
    if (groupIndex === -1) return;

    const updatedGroups = [...groups];
    const updatedGroup = {
      ...updatedGroups[groupIndex],
      expenses: [],
    };
    updatedGroups[groupIndex] = updatedGroup;

    await saveGroups(updatedGroups);
    if (currentGroup?.id === groupId) {
      setCurrentGroup(updatedGroup);
    }
  };

  const getDebts = (groupId: string) => {
    const balances = getGroupBalances(groupId);
    const debts: { from: string; to: string; amount: number }[] = [];

    const debtors: { id: string; amount: number }[] = [];
    const creditors: { id: string; amount: number }[] = [];

    Object.entries(balances).forEach(([id, amount]) => {
      // Fix floating point precision
      const val = Math.round(amount * 100) / 100;
      if (val < -0.01) debtors.push({ id, amount: -val }); // Convert to positive
      if (val > 0.01) creditors.push({ id, amount: val });
    });

    // Sort by amount (largest first) for better debt simplification
    debtors.sort((a, b) => b.amount - a.amount);
    creditors.sort((a, b) => b.amount - a.amount);

    let i = 0; // debtor index
    let j = 0; // creditor index

    while (i < debtors.length && j < creditors.length) {
      const debtor = debtors[i];
      const creditor = creditors[j];

      // The amount to settle is the minimum of what debtor owes and creditor is owed
      const settleAmount = Math.min(debtor.amount, creditor.amount);

      // Only add debt if amount is significant (> 0.01)
      if (settleAmount > 0.01) {
        debts.push({
          from: debtor.id,
          to: creditor.id,
          amount: Math.round(settleAmount * 100) / 100,
        });
      }

      // Update remaining amounts
      debtor.amount -= settleAmount;
      creditor.amount -= settleAmount;

      // Move to next if settled (with small epsilon for float errors)
      if (debtor.amount < 0.01) i++;
      if (creditor.amount < 0.01) j++;
    }

    return debts;
  };

  const deleteGroup = async (groupId: string) => {
    const newGroups = groups.filter((g) => g.id !== groupId);
    await saveGroups(newGroups);
    if (currentGroup?.id === groupId) {
      setCurrentGroup(null);
    }
  };

  const deleteExpense = async (groupId: string, expenseId: string) => {
    const groupIndex = groups.findIndex((g) => g.id === groupId);
    if (groupIndex === -1) return;

    const updatedGroups = [...groups];
    const updatedGroup = {
      ...updatedGroups[groupIndex],
      expenses: updatedGroups[groupIndex].expenses.filter(
        (e) => e.id !== expenseId,
      ),
    };
    updatedGroups[groupIndex] = updatedGroup;

    await saveGroups(updatedGroups);
    if (currentGroup?.id === groupId) {
      setCurrentGroup(updatedGroup);
    }
  };

  const addMember = async (groupId: string, name: string) => {
    const groupIndex = groups.findIndex((g) => g.id === groupId);
    if (groupIndex === -1) return;

    const newMember: Member = {
      id: Date.now().toString(),
      name: name.trim(),
    };

    const updatedGroups = [...groups];
    const updatedGroup = {
      ...updatedGroups[groupIndex],
      members: [...updatedGroups[groupIndex].members, newMember],
    };
    updatedGroups[groupIndex] = updatedGroup;

    await saveGroups(updatedGroups);
    if (currentGroup?.id === groupId) {
      setCurrentGroup(updatedGroup);
    }
  };

  const removeMember = async (groupId: string, memberId: string) => {
    const groupIndex = groups.findIndex((g) => g.id === groupId);
    if (groupIndex === -1) return;

    // Optional: Check if member has expenses or debts
    // For now, simpler removal
    const updatedGroups = [...groups];
    const updatedGroup = {
      ...updatedGroups[groupIndex],
      members: updatedGroups[groupIndex].members.filter(
        (m) => m.id !== memberId,
      ),
    };
    updatedGroups[groupIndex] = updatedGroup;

    await saveGroups(updatedGroups);
    if (currentGroup?.id === groupId) {
      setCurrentGroup(updatedGroup);
    }
  };

  return (
    <SplitBillContext.Provider
      value={{
        groups,
        currentGroup,
        isLoading,
        createGroup,
        selectGroup,
        addExpense,
        getGroupBalances,
        getDebts,
        settleUp,
        deleteGroup,
        deleteExpense,
        addMember,
        removeMember,
      }}
    >
      {children}
    </SplitBillContext.Provider>
  );
};
