import { supabase } from "@/lib/supabase";
import { Database } from "@/types/database.types";

type Goal = Database["public"]["Tables"]["savings_goals"]["Row"];
type GoalInsert = Database["public"]["Tables"]["savings_goals"]["Insert"];
type GoalUpdate = Database["public"]["Tables"]["savings_goals"]["Update"];
type GoalContribution =
  Database["public"]["Tables"]["goal_contributions"]["Row"];
type GoalContributionInsert =
  Database["public"]["Tables"]["goal_contributions"]["Insert"];

interface GoalWithContributions extends Goal {
  goal_contributions: GoalContribution[];
}

export const goalsService = {
  /**
   * Get all goals for a user
   */
  async getAll(userId: string) {
    const { data, error } = await supabase
      .from("savings_goals")
      .select(
        `
        *,
        goal_contributions (*)
      `,
      )
      .eq("user_id", userId)
      .order("priority", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as GoalWithContributions[];
  },

  /**
   * Get active goals only
   */
  async getActive(userId: string) {
    const { data, error } = await supabase
      .from("savings_goals")
      .select(
        `
        *,
        goal_contributions (*)
      `,
      )
      .eq("user_id", userId)
      .eq("status", "active")
      .order("priority", { ascending: false });

    if (error) throw error;
    return data as GoalWithContributions[];
  },

  /**
   * Get completed goals only
   */
  async getCompleted(userId: string) {
    const { data, error } = await supabase
      .from("savings_goals")
      .select(
        `
        *,
        goal_contributions (*)
      `,
      )
      .eq("user_id", userId)
      .eq("status", "completed")
      .order("completed_at", { ascending: false });

    if (error) throw error;
    return data as GoalWithContributions[];
  },

  /**
   * Get single goal by ID
   */
  async getById(id: string) {
    const { data, error } = await supabase
      .from("savings_goals")
      .select(
        `
        *,
        goal_contributions (*)
      `,
      )
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as GoalWithContributions;
  },

  /**
   * Create a new goal
   */
  async create(goal: GoalInsert) {
    const { data, error } = await supabase
      .from("savings_goals")
      .insert(goal)
      .select()
      .single();

    if (error) throw error;
    return data as Goal;
  },

  /**
   * Update a goal
   */
  async update(id: string, updates: GoalUpdate) {
    const { data, error } = await supabase
      .from("savings_goals")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Goal;
  },

  /**
   * Delete a goal
   */
  async delete(id: string) {
    const { error } = await supabase
      .from("savings_goals")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },

  /**
   * Add contribution to a goal
   */
  async addContribution(contribution: GoalContributionInsert) {
    // Create contribution
    const { data: newContribution, error: contribError } = await supabase
      .from("goal_contributions")
      .insert(contribution)
      .select()
      .single();

    if (contribError) throw contribError;

    // Update goal's current amount
    const { data: goal } = await supabase
      .from("savings_goals")
      .select("current_amount, target_amount")
      .eq("id", contribution.goal_id)
      .single();

    if (goal) {
      const newAmount =
        Number(goal.current_amount) + Number(contribution.amount);

      // Check if goal is completed
      const isCompleted = newAmount >= Number(goal.target_amount);

      await supabase
        .from("savings_goals")
        .update({
          current_amount: newAmount,
          status: isCompleted ? "completed" : "active",
          completed_at: isCompleted ? new Date().toISOString() : null,
        })
        .eq("id", contribution.goal_id);
    }

    return newContribution as GoalContribution;
  },

  /**
   * Deposit money to a goal (updates goal and creates transaction)
   */
  async depositToGoal(goalId: string, amount: number, userId: string) {
    // Get the current goal
    const goal = await this.getById(goalId);
    if (!goal) throw new Error("Goal not found");

    // Parse goal name to get display name
    let goalName = goal.name;
    if (goal.name.startsWith("icon:")) {
      const parts = goal.name.split("|");
      if (parts.length === 2) {
        goalName = parts[1];
      }
    }

    // Update goal's current amount
    const newAmount = Number(goal.current_amount) + amount;
    const isCompleted = newAmount >= Number(goal.target_amount);

    const { data: updatedGoal, error: goalError } = await supabase
      .from("savings_goals")
      .update({
        current_amount: newAmount,
        status: isCompleted ? "completed" : "active",
        completed_at: isCompleted ? new Date().toISOString() : null,
      })
      .eq("id", goalId)
      .select()
      .single();

    if (goalError) throw goalError;

    // Create a transaction for the deposit
    const { data: transaction, error: transactionError } = await supabase
      .from("transactions")
      .insert({
        user_id: userId,
        type: "expense",
        amount: amount,
        category: "Savings",
        transaction_date: new Date().toISOString().split("T")[0],
        description: `Deposit to ${goalName}`,
        currency: "USD",
      })
      .select()
      .single();

    if (transactionError) throw transactionError;

    // Create contribution record
    const { error: contributionError } = await supabase
      .from("goal_contributions")
      .insert({
        goal_id: goalId,
        amount: amount,
        contribution_date: new Date().toISOString().split("T")[0],
      });

    if (contributionError) throw contributionError;

    return {
      goal: updatedGoal,
      transaction,
      isCompleted,
    };
  },

  /**
   * Get contributions for a goal
   */
  async getContributions(goalId: string) {
    const { data, error } = await supabase
      .from("goal_contributions")
      .select("*")
      .eq("goal_id", goalId)
      .order("contribution_date", { ascending: false });

    if (error) throw error;
    return data as GoalContribution[];
  },

  /**
   * Mark goal as completed
   */
  async markCompleted(id: string) {
    const { data, error } = await supabase
      .from("savings_goals")
      .update({
        status: "completed",
        completed_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Goal;
  },

  /**
   * Cancel a goal
   */
  async cancel(id: string) {
    const { data, error } = await supabase
      .from("savings_goals")
      .update({
        status: "cancelled",
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Goal;
  },

  /**
   * Get goals summary statistics
   */
  async getGoalsSummary(userId: string) {
    const goals = await this.getAll(userId);

    const activeGoals = goals.filter((g) => g.status === "active");
    const completedGoals = goals.filter((g) => g.status === "completed");

    const totalTargetAmount = activeGoals.reduce(
      (sum, g) => sum + Number(g.target_amount),
      0,
    );

    const totalCurrentAmount = activeGoals.reduce(
      (sum, g) => sum + Number(g.current_amount),
      0,
    );

    const totalRemaining = totalTargetAmount - totalCurrentAmount;
    const percentageComplete =
      totalTargetAmount > 0
        ? (totalCurrentAmount / totalTargetAmount) * 100
        : 0;

    return {
      totalGoals: goals.length,
      activeGoals: activeGoals.length,
      completedGoals: completedGoals.length,
      totalTargetAmount,
      totalCurrentAmount,
      totalRemaining,
      percentageComplete,
    };
  },

  /**
   * Calculate goal progress percentage
   */
  calculateProgress(currentAmount: number, targetAmount: number): number {
    if (targetAmount <= 0) return 0;
    return Math.min((currentAmount / targetAmount) * 100, 100);
  },

  /**
   * Calculate days remaining until target date
   */
  calculateDaysRemaining(targetDate: string | null): number | null {
    if (!targetDate) return null;

    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  },

  /**
   * Calculate required monthly contribution to reach goal
   */
  calculateRequiredMonthlyContribution(
    currentAmount: number,
    targetAmount: number,
    targetDate: string | null,
  ): number | null {
    if (!targetDate) return null;

    const remaining = targetAmount - currentAmount;
    if (remaining <= 0) return 0;

    const daysRemaining = this.calculateDaysRemaining(targetDate);
    if (!daysRemaining || daysRemaining <= 0) return null;

    const monthsRemaining = daysRemaining / 30;
    return remaining / monthsRemaining;
  },
};
