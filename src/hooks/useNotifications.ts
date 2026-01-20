import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationsService } from "@/services/notifications.service";
import { useAuth } from "@/context/SupabaseAuthContext";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/database.types";

type NotificationInsert =
  Database["public"]["Tables"]["notifications"]["Insert"];

/**
 * Hook to fetch all notifications
 */
export const useNotifications = (limit = 50) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["notifications", user?.id, limit],
    queryFn: () => notificationsService.getAll(user!.id, limit),
    enabled: !!user,
  });
};

/**
 * Hook to fetch unread notifications
 */
export const useUnreadNotifications = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["notifications", user?.id, "unread"],
    queryFn: () => notificationsService.getUnread(user!.id),
    enabled: !!user,
  });
};

/**
 * Hook to fetch unread count
 */
export const useUnreadNotificationsCount = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["notifications", user?.id, "unread-count"],
    queryFn: () => notificationsService.getUnreadCount(user!.id),
    enabled: !!user,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

/**
 * Hook to create notification
 */
export const useCreateNotification = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notification: Omit<NotificationInsert, "user_id">) =>
      notificationsService.create({
        ...notification,
        user_id: user!.id,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

/**
 * Hook to mark notification as read
 */
export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationsService.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

/**
 * Hook to mark all notifications as read
 */
export const useMarkAllNotificationsAsRead = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationsService.markAllAsRead(user!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

/**
 * Hook to delete notification
 */
export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

/**
 * Hook to delete all notifications
 */
export const useDeleteAllNotifications = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationsService.deleteAll(user!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

/**
 * Hook for real-time notifications
 */
export const useRealtimeNotifications = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel(`notifications-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [user, queryClient]);
};
