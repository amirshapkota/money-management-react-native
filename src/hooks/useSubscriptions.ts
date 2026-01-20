import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { subscriptionsService } from "@/services/subscriptions.service";
import { useAuth } from "@/context/SupabaseAuthContext";
import { Database } from "@/types/database.types";

type SubscriptionInsert =
  Database["public"]["Tables"]["subscriptions"]["Insert"];
type SubscriptionUpdate =
  Database["public"]["Tables"]["subscriptions"]["Update"];

/**
 * Hook to fetch all subscriptions
 */
export const useSubscriptions = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["subscriptions", user?.id],
    queryFn: () => subscriptionsService.getAll(user!.id),
    enabled: !!user,
  });
};

/**
 * Hook to fetch active subscriptions only
 */
export const useActiveSubscriptions = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["subscriptions", user?.id, "active"],
    queryFn: () => subscriptionsService.getActive(user!.id),
    enabled: !!user,
  });
};

/**
 * Hook to fetch single subscription by ID
 */
export const useSubscriptionById = (id: string) => {
  return useQuery({
    queryKey: ["subscriptions", id],
    queryFn: () => subscriptionsService.getById(id),
    enabled: !!id,
  });
};

/**
 * Hook to fetch upcoming subscriptions
 */
export const useUpcomingSubscriptions = (days = 7) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["subscriptions", user?.id, "upcoming", days],
    queryFn: () => subscriptionsService.getUpcoming(user!.id, days),
    enabled: !!user,
  });
};

/**
 * Hook to fetch subscription statistics
 */
export const useSubscriptionStats = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["subscriptions", user?.id, "stats"],
    queryFn: () => subscriptionsService.getSubscriptionStats(user!.id),
    enabled: !!user,
  });
};

/**
 * Hook to create a subscription
 */
export const useCreateSubscription = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (subscription: Omit<SubscriptionInsert, "user_id">) =>
      subscriptionsService.create({
        ...subscription,
        user_id: user!.id,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });
};

/**
 * Hook to update a subscription
 */
export const useUpdateSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: SubscriptionUpdate;
    }) => subscriptionsService.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });
};

/**
 * Hook to delete a subscription
 */
export const useDeleteSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => subscriptionsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });
};

/**
 * Hook to pause a subscription
 */
export const usePauseSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => subscriptionsService.pause(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });
};

/**
 * Hook to resume a subscription
 */
export const useResumeSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => subscriptionsService.resume(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });
};

/**
 * Hook to cancel a subscription
 */
export const useCancelSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => subscriptionsService.cancel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });
};

/**
 * Hook to update next billing date
 */
export const useUpdateNextBillingDate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => subscriptionsService.updateNextBillingDate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });
};
