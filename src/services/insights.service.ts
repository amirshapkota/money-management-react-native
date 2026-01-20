import { supabase } from "@/lib/supabase";
import { transactionsService } from "./transactions.service";

interface SpendingTrend {
  date: string;
  amount: number;
}

interface CategoryBreakdown {
  category: string;
  amount: number;
  percentage: number;
  transactionCount: number;
}

interface MonthlyComparison {
  month: string;
  income: number;
  expense: number;
  balance: number;
}

export const insightsService = {
  /**
   * Get spending trends over time
   */
  async getSpendingTrends(
    userId: string,
    startDate: string,
    endDate: string,
    groupBy: "day" | "week" | "month" = "day",
  ): Promise<SpendingTrend[]> {
    const transactions = await transactionsService.getByDateRange(
      userId,
      startDate,
      endDate,
    );

    const expenses = transactions.filter((t) => t.type === "expense");

    // Group by date
    const grouped = new Map<string, number>();

    expenses.forEach((transaction) => {
      const date = new Date(transaction.transaction_date);
      let key: string;

      switch (groupBy) {
        case "week":
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay());
          key = weekStart.toISOString().split("T")[0];
          break;
        case "month":
          key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
            2,
            "0",
          )}`;
          break;
        default:
          key = transaction.transaction_date;
      }

      grouped.set(key, (grouped.get(key) || 0) + Number(transaction.amount));
    });

    return Array.from(grouped.entries())
      .map(([date, amount]) => ({ date, amount }))
      .sort((a, b) => a.date.localeCompare(b.date));
  },

  /**
   * Get category breakdown with percentages
   */
  async getCategoryBreakdown(
    userId: string,
    startDate: string,
    endDate: string,
  ): Promise<CategoryBreakdown[]> {
    const transactions = await transactionsService.getByDateRange(
      userId,
      startDate,
      endDate,
    );

    const expenses = transactions.filter((t) => t.type === "expense");
    const totalExpense = expenses.reduce((sum, t) => sum + Number(t.amount), 0);

    // Group by category
    const categoryMap = new Map<string, { amount: number; count: number }>();

    expenses.forEach((transaction) => {
      const category = transaction.category || "Uncategorized";
      const current = categoryMap.get(category) || { amount: 0, count: 0 };
      categoryMap.set(category, {
        amount: current.amount + Number(transaction.amount),
        count: current.count + 1,
      });
    });

    return Array.from(categoryMap.entries())
      .map(([category, data]) => ({
        category,
        amount: data.amount,
        percentage: totalExpense > 0 ? (data.amount / totalExpense) * 100 : 0,
        transactionCount: data.count,
      }))
      .sort((a, b) => b.amount - a.amount);
  },

  /**
   * Get monthly comparisons
   */
  async getMonthlyComparison(
    userId: string,
    monthsCount = 6,
  ): Promise<MonthlyComparison[]> {
    const comparisons: MonthlyComparison[] = [];
    const today = new Date();

    for (let i = monthsCount - 1; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      const startDate = `${year}-${String(month).padStart(2, "0")}-01`;
      const endDate = new Date(year, month, 0).toISOString().split("T")[0];

      const stats = await transactionsService.getStats(
        userId,
        startDate,
        endDate,
      );

      comparisons.push({
        month: `${year}-${String(month).padStart(2, "0")}`,
        income: stats.income,
        expense: stats.expense,
        balance: stats.balance,
      });
    }

    return comparisons;
  },

  /**
   * Get top merchants
   */
  async getTopMerchants(
    userId: string,
    startDate: string,
    endDate: string,
    limit = 10,
  ) {
    const transactions = await transactionsService.getByDateRange(
      userId,
      startDate,
      endDate,
    );

    const expenses = transactions.filter(
      (t) => t.type === "expense" && t.merchant,
    );

    // Group by merchant
    const merchantMap = new Map<string, { amount: number; count: number }>();

    expenses.forEach((transaction) => {
      const merchant = transaction.merchant!;
      const current = merchantMap.get(merchant) || { amount: 0, count: 0 };
      merchantMap.set(merchant, {
        amount: current.amount + Number(transaction.amount),
        count: current.count + 1,
      });
    });

    return Array.from(merchantMap.entries())
      .map(([merchant, data]) => ({
        merchant,
        amount: data.amount,
        transactionCount: data.count,
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, limit);
  },

  /**
   * Get average daily spending
   */
  async getAverageDailySpending(
    userId: string,
    startDate: string,
    endDate: string,
  ): Promise<number> {
    const transactions = await transactionsService.getByDateRange(
      userId,
      startDate,
      endDate,
    );

    const expenses = transactions.filter((t) => t.type === "expense");
    const totalExpense = expenses.reduce((sum, t) => sum + Number(t.amount), 0);

    const start = new Date(startDate);
    const end = new Date(endDate);
    const daysDiff = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );

    return daysDiff > 0 ? totalExpense / daysDiff : 0;
  },

  /**
   * Get budget adherence metrics
   */
  async getBudgetAdherence(userId: string, month: string) {
    const startDate = `${month}-01`;
    const endDate = new Date(
      new Date(month).getFullYear(),
      new Date(month).getMonth() + 1,
      0,
    )
      .toISOString()
      .split("T")[0];

    const { data: budget } = await supabase
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

    if (!budget) {
      return null;
    }

    const categoriesOnBudget = budget.budget_categories.filter(
      (cat: any) => cat.spent_amount <= cat.limit_amount,
    ).length;

    const categoriesOverBudget = budget.budget_categories.filter(
      (cat: any) => cat.spent_amount > cat.limit_amount,
    ).length;

    const totalLimit = budget.budget_categories.reduce(
      (sum: number, cat: any) => sum + Number(cat.limit_amount),
      0,
    );

    const totalSpent = budget.budget_categories.reduce(
      (sum: number, cat: any) => sum + Number(cat.spent_amount),
      0,
    );

    const adherencePercentage =
      totalLimit > 0
        ? Math.min(100, ((totalLimit - totalSpent) / totalLimit) * 100)
        : 100;

    return {
      totalCategories: budget.budget_categories.length,
      categoriesOnBudget,
      categoriesOverBudget,
      totalLimit,
      totalSpent,
      remaining: totalLimit - totalSpent,
      adherencePercentage,
    };
  },

  /**
   * Get income vs expense trend
   */
  async getIncomeVsExpenseTrend(userId: string, monthsCount = 6) {
    const trends: {
      month: string;
      income: number;
      expense: number;
      savingsRate: number;
    }[] = [];
    const today = new Date();

    for (let i = monthsCount - 1; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      const startDate = `${year}-${String(month).padStart(2, "0")}-01`;
      const endDate = new Date(year, month, 0).toISOString().split("T")[0];

      const stats = await transactionsService.getStats(
        userId,
        startDate,
        endDate,
      );

      const savingsRate =
        stats.income > 0
          ? ((stats.income - stats.expense) / stats.income) * 100
          : 0;

      trends.push({
        month: `${year}-${String(month).padStart(2, "0")}`,
        income: stats.income,
        expense: stats.expense,
        savingsRate,
      });
    }

    return trends;
  },
};
