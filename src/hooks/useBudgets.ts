import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { budgetsService } from "@/services/budgets.service";
import { useAuth } from "@/context/SupabaseAuthContext";
import { Database } from "@/types/database.types";

type BudgetInsert = Database["public"]["Tables"]["budgets"]["Insert"];
type BudgetUpdate = Database["public"]["Tables"]["budgets"]["Update"];
type BudgetCategoryInsert =
  Database["public"]["Tables"]["budget_categories"]["Insert"];
type BudgetCategoryUpdate =
  Database["public"]["Tables"]["budget_categories"]["Update"];

/**
 * Hook to fetch budget for a specific month
 */
export const useBudgetByMonth = (month: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["budgets", user?.id, month],
    queryFn: () => budgetsService.getByMonth(user!.id, month),
    enabled: !!user && !!month,
    staleTime: 0, // Always consider data stale
    gcTime: 0, // Don't cache data
    refetchOnMount: "always", // Always refetch when component mounts
    refetchOnWindowFocus: true, // Refetch when window gets focus
  });
};

/**
 * Hook to fetch all budgets
 */
export const useBudgets = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["budgets", user?.id],
    queryFn: () => budgetsService.getAll(user!.id),
    enabled: !!user,
  });
};

/**
 * Hook to fetch budget summary
 */
export const useBudgetSummary = (month: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["budgets", user?.id, month, "summary"],
    queryFn: () => budgetsService.getBudgetSummary(user!.id, month),
    enabled: !!user && !!month,
    staleTime: 0, // Always consider data stale
    gcTime: 0, // Don't cache data
    refetchOnMount: "always", // Always refetch when component mounts
    refetchOnWindowFocus: true, // Refetch when window gets focus
  });
};

/**
 * Hook to create a budget
 */
export const useCreateBudget = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (budget: Omit<BudgetInsert, "user_id">) =>
      budgetsService.create({
        ...budget,
        user_id: user!.id,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
};

/**
 * Hook to get budget categories
 */
export const useBudgetCategories = (budgetId: string) => {
  return useQuery({
    queryKey: ["budgets", budgetId, "categories"],
    queryFn: () => budgetsService.getCategories(budgetId),
    enabled: !!budgetId,
  });
};

/**
 * Hook to create budget with default categories
 */
export const useCreateBudgetWithDefaults = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      month,
      totalBudget,
    }: {
      month: string;
      totalBudget?: number;
    }) => budgetsService.createWithDefaults(user!.id, month, totalBudget),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
};

/**
 * Hook to update a budget
 */
export const useUpdateBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: BudgetUpdate }) =>
      budgetsService.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
};

/**
 * Hook to delete a budget
 */
export const useDeleteBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => budgetsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
};

/**
 * Hook to create a budget category
 */
export const useCreateBudgetCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (category: BudgetCategoryInsert) =>
      budgetsService.createCategory(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
};

/**
 * Hook to update a budget category
 */
export const useUpdateBudgetCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: BudgetCategoryUpdate;
    }) => budgetsService.updateCategory(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
};

/**
 * Hook to delete a budget category
 */
export const useDeleteBudgetCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => budgetsService.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
};

/**
 * Hook to recalculate budget spending from transactions
 */
export const useRecalculateBudgetSpending = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      budgetId,
      userId,
      month,
    }: {
      budgetId: string;
      userId: string;
      month: string;
    }) => budgetsService.recalculateBudgetSpending(budgetId, userId, month),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
};

/**
 * Hook to update category spent amount from transactions
 */
export const useUpdateCategorySpent = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: ({
      budgetId,
      categoryName,
      month,
    }: {
      budgetId: string;
      categoryName: string;
      month: string;
    }) =>
      budgetsService.updateCategorySpent(
        budgetId,
        categoryName,
        user!.id,
        month,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
};
