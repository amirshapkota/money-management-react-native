import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { goalsService } from "@/services/goals.service";
import { useAuth } from "@/context/SupabaseAuthContext";
import { Database } from "@/types/database.types";

type GoalInsert = Database["public"]["Tables"]["savings_goals"]["Insert"];
type GoalUpdate = Database["public"]["Tables"]["savings_goals"]["Update"];
type GoalContributionInsert =
  Database["public"]["Tables"]["goal_contributions"]["Insert"];

/**
 * Hook to fetch all goals
 */
export const useGoals = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["goals", user?.id],
    queryFn: () => goalsService.getAll(user!.id),
    enabled: !!user,
  });
};

/**
 * Hook to fetch active goals only
 */
export const useActiveGoals = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["goals", user?.id, "active"],
    queryFn: () => goalsService.getActive(user!.id),
    enabled: !!user,
  });
};

/**
 * Hook to fetch completed goals only
 */
export const useCompletedGoals = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["goals", user?.id, "completed"],
    queryFn: () => goalsService.getCompleted(user!.id),
    enabled: !!user,
  });
};

/**
 * Hook to fetch single goal by ID
 */
export const useGoalById = (id: string) => {
  return useQuery({
    queryKey: ["goals", id],
    queryFn: () => goalsService.getById(id),
    enabled: !!id,
  });
};

/**
 * Hook to fetch goals summary
 */
export const useGoalsSummary = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["goals", user?.id, "summary"],
    queryFn: () => goalsService.getGoalsSummary(user!.id),
    enabled: !!user,
  });
};

/**
 * Hook to fetch contributions for a goal
 */
export const useGoalContributions = (goalId: string) => {
  return useQuery({
    queryKey: ["goals", goalId, "contributions"],
    queryFn: () => goalsService.getContributions(goalId),
    enabled: !!goalId,
  });
};

/**
 * Hook to create a goal
 */
export const useCreateGoal = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (goal: Omit<GoalInsert, "user_id">) =>
      goalsService.create({
        ...goal,
        user_id: user!.id,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
};

/**
 * Hook to update a goal
 */
export const useUpdateGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: GoalUpdate }) =>
      goalsService.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
};

/**
 * Hook to delete a goal
 */
export const useDeleteGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => goalsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
};

/**
 * Hook to add contribution to a goal
 */
export const useAddContribution = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contribution: GoalContributionInsert) =>
      goalsService.addContribution(contribution),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
};

/**
 * Hook to deposit money to a goal (creates transaction)
 */
export const useDepositToGoal = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ goalId, amount }: { goalId: string; amount: number }) =>
      goalsService.depositToGoal(goalId, amount, user!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};

/**
 * Hook to mark goal as completed
 */
export const useMarkGoalCompleted = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => goalsService.markCompleted(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
};

/**
 * Hook to cancel a goal
 */
export const useCancelGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => goalsService.cancel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
};
