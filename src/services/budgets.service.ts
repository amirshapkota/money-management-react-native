import { supabase } from "@/lib/supabase";
import { Database } from "@/types/database.types";

type Budget = Database["public"]["Tables"]["budgets"]["Row"];
type BudgetInsert = Database["public"]["Tables"]["budgets"]["Insert"];
type BudgetUpdate = Database["public"]["Tables"]["budgets"]["Update"];
type BudgetCategory = Database["public"]["Tables"]["budget_categories"]["Row"];
type BudgetCategoryInsert =
  Database["public"]["Tables"]["budget_categories"]["Insert"];
type BudgetCategoryUpdate =
  Database["public"]["Tables"]["budget_categories"]["Update"];

interface BudgetWithCategories extends Budget {
  budget_categories: BudgetCategory[];
}

export const budgetsService = {
  /**
   * Get budget for a specific month
   */
  async getByMonth(userId: string, month: string) {
    const { data, error } = await supabase
      .from("budgets")
      .select(
        `
        *,
        budget_categories (*)
      `,
      )
      .eq("user_id", userId)
      .eq("month", month)
      .single();

    if (error && error.code !== "PGRST116") throw error; // PGRST116 = no rows

    if (!data) return null;

    // Calculate spent amounts from transactions dynamically
    // month is already in format "2026-01-01", so extract year-month
    const monthDate = new Date(month);
    const year = monthDate.getFullYear();
    const monthNum = monthDate.getMonth();

    const startDate = month; // Already in YYYY-MM-DD format (2026-01-01)
    const endDate = new Date(year, monthNum + 1, 0).toISOString().split("T")[0];

    console.log(
      `[BudgetService.getByMonth] Fetching transactions for month: ${month}`,
    );
    console.log(
      `[BudgetService.getByMonth] Date range: ${startDate} to ${endDate}`,
    );
    console.log(`[BudgetService.getByMonth] User ID: ${userId}`);

    // Get all transactions for the month
    const { data: transactions } = await supabase
      .from("transactions")
      .select("category, amount, transaction_date")
      .eq("user_id", userId)
      .eq("type", "expense")
      .gte("transaction_date", startDate)
      .lte("transaction_date", endDate);

    console.log(`[BudgetService.getByMonth] Transactions found:`, transactions);

    // Calculate spent by category
    const spentByCategory: Record<string, number> = {};
    if (transactions) {
      transactions.forEach((t) => {
        spentByCategory[t.category] =
          (spentByCategory[t.category] || 0) + Number(t.amount);
      });
    }

    console.log(
      `[BudgetService] Month: ${month}, Transactions found: ${transactions?.length || 0}`,
    );
    console.log(`[BudgetService] Spent by category:`, spentByCategory);

    // Update categories with actual spent amounts
    const categoriesWithSpent = data.budget_categories.map(
      (cat: BudgetCategory) => ({
        ...cat,
        spent_amount: spentByCategory[cat.name] || 0,
      }),
    );

    return {
      ...data,
      budget_categories: categoriesWithSpent,
    } as BudgetWithCategories;
  },

  /**
   * Get all budgets for a user
   */
  async getAll(userId: string) {
    const { data, error } = await supabase
      .from("budgets")
      .select(
        `
        *,
        budget_categories (*)
      `,
      )
      .eq("user_id", userId)
      .order("month", { ascending: false });

    if (error) throw error;
    return data as BudgetWithCategories[];
  },

  /**
   * Create a new budget for a month
   */
  async create(budget: BudgetInsert) {
    const { data, error } = await supabase
      .from("budgets")
      .insert(budget)
      .select()
      .single();

    if (error) throw error;
    return data as Budget;
  },

  /**
   * Update a budget
   */
  async update(id: string, updates: BudgetUpdate) {
    const { data, error } = await supabase
      .from("budgets")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Budget;
  },

  /**
   * Delete a budget
   */
  async delete(id: string) {
    const { error } = await supabase.from("budgets").delete().eq("id", id);

    if (error) throw error;
  },

  /**
   * Create a budget category
   */
  async createCategory(category: BudgetCategoryInsert) {
    const { data, error } = await supabase
      .from("budget_categories")
      .insert(category)
      .select()
      .single();

    if (error) throw error;
    return data as BudgetCategory;
  },

  /**
   * Update a budget category
   */
  async updateCategory(id: string, updates: BudgetCategoryUpdate) {
    const { data, error } = await supabase
      .from("budget_categories")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as BudgetCategory;
  },

  /**
   * Delete a budget category
   */
  async deleteCategory(id: string) {
    const { error } = await supabase
      .from("budget_categories")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },

  /**
   * Get budget categories for a budget
   */
  async getCategories(budgetId: string) {
    const { data, error } = await supabase
      .from("budget_categories")
      .select("*")
      .eq("budget_id", budgetId)
      .order("name");

    if (error) throw error;
    return data as BudgetCategory[];
  },

  /**
   * Update spent amount for a category based on transactions
   */
  async updateCategorySpent(
    budgetId: string,
    categoryName: string,
    userId: string,
    month: string,
  ) {
    // Calculate spent amount from transactions
    const startDate = `${month}-01`;
    const endDate = new Date(
      new Date(month).getFullYear(),
      new Date(month).getMonth() + 1,
      0,
    )
      .toISOString()
      .split("T")[0];

    const { data: transactions } = await supabase
      .from("transactions")
      .select("amount")
      .eq("user_id", userId)
      .eq("category", categoryName)
      .eq("type", "expense")
      .gte("transaction_date", startDate)
      .lte("transaction_date", endDate);

    const spent = transactions
      ? transactions.reduce((sum, t) => sum + Number(t.amount), 0)
      : 0;

    // Update the category
    const { data: category } = await supabase
      .from("budget_categories")
      .select("*")
      .eq("budget_id", budgetId)
      .eq("name", categoryName)
      .single();

    if (category) {
      await this.updateCategory(category.id, { spent_amount: spent });
    }

    return spent;
  },

  /**
   * Recalculate spent amounts for all categories in a budget
   */
  async recalculateBudgetSpending(
    budgetId: string,
    userId: string,
    month: string,
  ) {
    const categories = await this.getCategories(budgetId);

    for (const category of categories) {
      await this.updateCategorySpent(budgetId, category.name, userId, month);
    }
  },

  /**
   * Create budget with default categories
   */
  async createWithDefaults(userId: string, month: string, totalBudget = 2000) {
    // Create budget
    const budget = await this.create({
      user_id: userId,
      month,
      total_budget: totalBudget,
    });

    // Default categories
    const defaultCategories = [
      {
        name: "Groceries",
        limit_amount: 300,
        icon: "cart",
        color: "#6366F1",
      },
      { name: "Transport", limit_amount: 150, icon: "car", color: "#F59E0B" },
      { name: "Rent", limit_amount: 800, icon: "home", color: "#EF4444" },
      {
        name: "Entertainment",
        limit_amount: 200,
        icon: "film",
        color: "#10B981",
      },
      {
        name: "Food & Drink",
        limit_amount: 250,
        icon: "utensils",
        color: "#8B5CF6",
      },
      {
        name: "Shopping",
        limit_amount: 150,
        icon: "shopping-bag",
        color: "#EC4899",
      },
      { name: "Health", limit_amount: 100, icon: "heart", color: "#06B6D4" },
      { name: "Other", limit_amount: 50, icon: "more", color: "#6B7280" },
    ];

    // Create categories
    for (const cat of defaultCategories) {
      await this.createCategory({
        budget_id: budget.id,
        ...cat,
        spent_amount: 0,
      });
    }

    // Return budget with categories
    return this.getByMonth(userId, month);
  },

  /**
   * Get budget summary statistics
   */
  async getBudgetSummary(userId: string, month: string) {
    const budget = await this.getByMonth(userId, month);

    if (!budget) {
      return null;
    }

    // budget.budget_categories already has calculated spent_amount from getByMonth
    const totalLimit = budget.budget_categories.reduce(
      (sum, cat) => sum + Number(cat.limit_amount),
      0,
    );

    const totalSpent = budget.budget_categories.reduce(
      (sum, cat) => sum + Number(cat.spent_amount),
      0,
    );

    const remaining = totalLimit - totalSpent;
    const percentageUsed = totalLimit > 0 ? (totalSpent / totalLimit) * 100 : 0;

    return {
      totalLimit,
      totalSpent,
      remaining,
      percentageUsed,
      categoriesCount: budget.budget_categories.length,
      categoriesOverBudget: budget.budget_categories.filter(
        (cat) => cat.spent_amount > cat.limit_amount,
      ).length,
      categoriesNearLimit: budget.budget_categories.filter(
        (cat) =>
          cat.spent_amount >= cat.limit_amount * cat.alert_threshold &&
          cat.spent_amount <= cat.limit_amount,
      ).length,
    };
  },
};
