import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "@/services/transactions.service";
import { useAuth } from "@/context/SupabaseAuthContext";
import { Database } from "@/types/database.types";

type TransactionInsert = Database["public"]["Tables"]["transactions"]["Insert"];
type TransactionUpdate = Database["public"]["Tables"]["transactions"]["Update"];

/**
 * Hook to fetch all transactions
 */
export const useTransactions = (limit = 50) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["transactions", user?.id, limit],
    queryFn: () => transactionsService.getAll(user!.id, limit),
    enabled: !!user,
  });
};

/**
 * Hook to fetch transactions by date range
 */
export const useTransactionsByDateRange = (
  startDate: string,
  endDate: string,
) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["transactions", user?.id, "dateRange", startDate, endDate],
    queryFn: () =>
      transactionsService.getByDateRange(user!.id, startDate, endDate),
    enabled: !!user && !!startDate && !!endDate,
  });
};

/**
 * Hook to fetch transactions by category
 */
export const useTransactionsByCategory = (category: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["transactions", user?.id, "category", category],
    queryFn: () => transactionsService.getByCategory(user!.id, category),
    enabled: !!user && !!category,
  });
};

/**
 * Hook to fetch transactions by type
 */
export const useTransactionsByType = (type: "income" | "expense") => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["transactions", user?.id, "type", type],
    queryFn: () => transactionsService.getByType(user!.id, type),
    enabled: !!user,
  });
};

/**
 * Hook to fetch transaction statistics
 */
export const useTransactionStats = (startDate: string, endDate: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["transactions", user?.id, "stats", startDate, endDate],
    queryFn: () => transactionsService.getStats(user!.id, startDate, endDate),
    enabled: !!user && !!startDate && !!endDate,
  });
};

/**
 * Hook to fetch spending by category
 */
export const useSpendingByCategory = (startDate: string, endDate: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: [
      "transactions",
      user?.id,
      "spendingByCategory",
      startDate,
      endDate,
    ],
    queryFn: () =>
      transactionsService.getSpendingByCategory(user!.id, startDate, endDate),
    enabled: !!user && !!startDate && !!endDate,
  });
};

/**
 * Hook to create a transaction
 */
export const useCreateTransaction = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (transaction: Omit<TransactionInsert, "user_id">) =>
      transactionsService.create({
        ...transaction,
        user_id: user!.id,
      }),
    onSuccess: async (data, variables) => {
      console.log(`[useCreateTransaction] Transaction created:`, data);
      console.log(`[useCreateTransaction] Transaction data:`, variables);
      console.log(
        `[useCreateTransaction] Invalidating and refetching queries...`,
      );

      // Invalidate and refetch all queries
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["transactions"],
          refetchType: "active",
        }),
        queryClient.invalidateQueries({
          queryKey: ["budgets"],
          refetchType: "active",
        }),
        queryClient.invalidateQueries({
          queryKey: ["goals"],
          refetchType: "active",
        }),
      ]);

      console.log(
        `[useCreateTransaction] All queries invalidated and refetched`,
      );
    },
  });
};

/**
 * Hook to update a transaction
 */
export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: TransactionUpdate }) =>
      transactionsService.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};

/**
 * Hook to delete a transaction
 */
export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => transactionsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};
