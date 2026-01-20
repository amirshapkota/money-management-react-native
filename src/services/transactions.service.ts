import { supabase } from "@/lib/supabase";
import { Database } from "@/types/database.types";

type Transaction = Database["public"]["Tables"]["transactions"]["Row"];
type TransactionInsert = Database["public"]["Tables"]["transactions"]["Insert"];
type TransactionUpdate = Database["public"]["Tables"]["transactions"]["Update"];

export const transactionsService = {
  /**
   * Get all transactions for a user
   */
  async getAll(userId: string, limit = 50) {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId)
      .order("transaction_date", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data as Transaction[];
  },

  /**
   * Get transactions by date range
   */
  async getByDateRange(userId: string, startDate: string, endDate: string) {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId)
      .gte("transaction_date", startDate)
      .lte("transaction_date", endDate)
      .order("transaction_date", { ascending: false });

    if (error) throw error;
    return data as Transaction[];
  },

  /**
   * Get transactions by category
   */
  async getByCategory(userId: string, category: string) {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId)
      .eq("category", category)
      .order("transaction_date", { ascending: false });

    if (error) throw error;
    return data as Transaction[];
  },

  /**
   * Get transactions by type (income/expense)
   */
  async getByType(userId: string, type: "income" | "expense") {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId)
      .eq("type", type)
      .order("transaction_date", { ascending: false });

    if (error) throw error;
    return data as Transaction[];
  },

  /**
   * Get single transaction by ID
   */
  async getById(id: string) {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as Transaction;
  },

  /**
   * Create a new transaction
   */
  async create(transaction: TransactionInsert) {
    const { data, error } = await supabase
      .from("transactions")
      .insert(transaction)
      .select()
      .single();

    if (error) throw error;
    return data as Transaction;
  },

  /**
   * Update a transaction
   */
  async update(id: string, updates: TransactionUpdate) {
    const { data, error } = await supabase
      .from("transactions")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Transaction;
  },

  /**
   * Delete a transaction
   */
  async delete(id: string) {
    const { error } = await supabase.from("transactions").delete().eq("id", id);

    if (error) throw error;
  },

  /**
   * Get transaction statistics for a date range
   */
  async getStats(userId: string, startDate: string, endDate: string) {
    const transactions = await this.getByDateRange(userId, startDate, endDate);

    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const balance = income - expense;

    return {
      income,
      expense,
      balance,
      transactionCount: transactions.length,
    };
  },

  /**
   * Get spending by category
   */
  async getSpendingByCategory(
    userId: string,
    startDate: string,
    endDate: string
  ) {
    const transactions = await this.getByDateRange(userId, startDate, endDate);

    const categoryMap = new Map<string, number>();

    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        const current = categoryMap.get(t.category) || 0;
        categoryMap.set(t.category, current + Number(t.amount));
      });

    return Array.from(categoryMap.entries()).map(([category, amount]) => ({
      category,
      amount,
    }));
  },
};
