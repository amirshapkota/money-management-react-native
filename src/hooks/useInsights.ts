import { useQuery } from "@tanstack/react-query";
import { insightsService } from "@/services/insights.service";
import { useAuth } from "@/context/SupabaseAuthContext";

/**
 * Hook to fetch spending trends
 */
export const useSpendingTrends = (
  startDate: string,
  endDate: string,
  groupBy: "day" | "week" | "month" = "day",
) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: [
      "insights",
      "spending-trends",
      user?.id,
      startDate,
      endDate,
      groupBy,
    ],
    queryFn: () =>
      insightsService.getSpendingTrends(user!.id, startDate, endDate, groupBy),
    enabled: !!user && !!startDate && !!endDate,
  });
};

/**
 * Hook to fetch category breakdown
 */
export const useCategoryBreakdown = (startDate: string, endDate: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["insights", "category-breakdown", user?.id, startDate, endDate],
    queryFn: () =>
      insightsService.getCategoryBreakdown(user!.id, startDate, endDate),
    enabled: !!user && !!startDate && !!endDate,
  });
};

/**
 * Hook to fetch monthly comparison
 */
export const useMonthlyComparison = (monthsCount = 6) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["insights", "monthly-comparison", user?.id, monthsCount],
    queryFn: () => insightsService.getMonthlyComparison(user!.id, monthsCount),
    enabled: !!user,
  });
};

/**
 * Hook to fetch top merchants
 */
export const useTopMerchants = (
  startDate: string,
  endDate: string,
  limit = 10,
) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: [
      "insights",
      "top-merchants",
      user?.id,
      startDate,
      endDate,
      limit,
    ],
    queryFn: () =>
      insightsService.getTopMerchants(user!.id, startDate, endDate, limit),
    enabled: !!user && !!startDate && !!endDate,
  });
};

/**
 * Hook to fetch average daily spending
 */
export const useAverageDailySpending = (startDate: string, endDate: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["insights", "avg-daily-spending", user?.id, startDate, endDate],
    queryFn: () =>
      insightsService.getAverageDailySpending(user!.id, startDate, endDate),
    enabled: !!user && !!startDate && !!endDate,
  });
};

/**
 * Hook to fetch budget adherence
 */
export const useBudgetAdherence = (month: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["insights", "budget-adherence", user?.id, month],
    queryFn: () => insightsService.getBudgetAdherence(user!.id, month),
    enabled: !!user && !!month,
  });
};

/**
 * Hook to fetch income vs expense trend
 */
export const useIncomeVsExpenseTrend = (monthsCount = 6) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["insights", "income-vs-expense", user?.id, monthsCount],
    queryFn: () =>
      insightsService.getIncomeVsExpenseTrend(user!.id, monthsCount),
    enabled: !!user,
  });
};
