import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { splitBillService } from "@/services/splitbill.service";
import { useAuth } from "@/context/SupabaseAuthContext";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

/**
 * Hook to fetch all groups for current user
 */
export const useSplitGroups = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["split-groups", user?.id],
    queryFn: () => splitBillService.getGroups(user!.id),
    enabled: !!user,
  });
};

/**
 * Hook to fetch single group with details
 */
export const useSplitGroup = (groupId: string) => {
  return useQuery({
    queryKey: ["split-groups", groupId],
    queryFn: () => splitBillService.getGroupById(groupId),
    enabled: !!groupId,
  });
};

/**
 * Hook to fetch group summary with balances and debts
 */
export const useSplitGroupSummary = (groupId: string) => {
  return useQuery({
    queryKey: ["split-groups", groupId, "summary"],
    queryFn: () => splitBillService.getGroupSummary(groupId),
    enabled: !!groupId,
  });
};

/**
 * Hook to create a new group
 */
export const useCreateSplitGroup = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      name,
      description,
      memberNames,
    }: {
      name: string;
      description: string;
      memberNames: string[];
    }) =>
      splitBillService.createGroup(name, description, user!.id, memberNames),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["split-groups"] });
    },
  });
};

/**
 * Hook to update a group
 */
export const useUpdateSplitGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      groupId,
      updates,
    }: {
      groupId: string;
      updates: { name?: string; description?: string; status?: string };
    }) => splitBillService.updateGroup(groupId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["split-groups"] });
    },
  });
};

/**
 * Hook to delete a group
 */
export const useDeleteSplitGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (groupId: string) => splitBillService.deleteGroup(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["split-groups"] });
    },
  });
};

/**
 * Hook to add member to group
 */
export const useAddGroupMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      groupId,
      name,
      email,
    }: {
      groupId: string;
      name: string;
      email?: string;
    }) => splitBillService.addMember(groupId, name, email),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["split-groups", variables.groupId],
      });
    },
  });
};

/**
 * Hook to remove member from group
 */
export const useRemoveGroupMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberId: string) => splitBillService.removeMember(memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["split-groups"] });
    },
  });
};

/**
 * Hook to add expense to group
 */
export const useAddGroupExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      groupId,
      description,
      amount,
      paidBy,
      splitBetween,
      expenseDate,
      category,
      splitType,
    }: {
      groupId: string;
      description: string;
      amount: number;
      paidBy: string;
      splitBetween: string[];
      expenseDate: string;
      category?: string;
      splitType?: "equal" | "percentage" | "exact" | "shares";
    }) =>
      splitBillService.addExpense(
        groupId,
        description,
        amount,
        paidBy,
        splitBetween,
        expenseDate,
        category,
        splitType,
      ),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["split-groups", variables.groupId],
      });
    },
  });
};

/**
 * Hook to delete expense
 */
export const useDeleteGroupExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (expenseId: string) =>
      splitBillService.deleteExpense(expenseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["split-groups"] });
    },
  });
};

/**
 * Hook to settle up group
 */
export const useSettleGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (groupId: string) => splitBillService.settleGroup(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["split-groups"] });
    },
  });
};

/**
 * Hook for real-time updates on group expenses
 */
export const useRealtimeGroupExpenses = (groupId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!groupId) return;

    const channel = supabase
      .channel(`group-expenses-${groupId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "group_expenses",
          filter: `group_id=eq.${groupId}`,
        },
        () => {
          queryClient.invalidateQueries({
            queryKey: ["split-groups", groupId],
          });
        },
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [groupId, queryClient]);
};
