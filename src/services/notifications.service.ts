import { supabase } from "@/lib/supabase";
import { Database } from "@/types/database.types";

type Notification = Database["public"]["Tables"]["notifications"]["Row"];
type NotificationInsert =
  Database["public"]["Tables"]["notifications"]["Insert"];
type NotificationUpdate =
  Database["public"]["Tables"]["notifications"]["Update"];

export const notificationsService = {
  /**
   * Get all notifications for a user
   */
  async getAll(userId: string, limit = 50) {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data as Notification[];
  },

  /**
   * Get unread notifications
   */
  async getUnread(userId: string) {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .eq("read", false)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as Notification[];
  },

  /**
   * Get unread count
   */
  async getUnreadCount(userId: string) {
    const { count, error } = await supabase
      .from("notifications")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("read", false);

    if (error) throw error;
    return count || 0;
  },

  /**
   * Create notification
   */
  async create(notification: NotificationInsert) {
    const { data, error } = await supabase
      .from("notifications")
      .insert(notification)
      .select()
      .single();

    if (error) throw error;
    return data as Notification;
  },

  /**
   * Mark notification as read
   */
  async markAsRead(id: string) {
    const { data, error } = await supabase
      .from("notifications")
      .update({
        read: true,
        read_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Notification;
  },

  /**
   * Mark all as read
   */
  async markAllAsRead(userId: string) {
    const { error } = await supabase
      .from("notifications")
      .update({
        read: true,
        read_at: new Date().toISOString(),
      })
      .eq("user_id", userId)
      .eq("read", false);

    if (error) throw error;
  },

  /**
   * Delete notification
   */
  async delete(id: string) {
    const { error } = await supabase
      .from("notifications")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },

  /**
   * Delete all notifications
   */
  async deleteAll(userId: string) {
    const { error } = await supabase
      .from("notifications")
      .delete()
      .eq("user_id", userId);

    if (error) throw error;
  },

  /**
   * Create budget alert notification
   */
  async createBudgetAlert(
    userId: string,
    categoryName: string,
    spent: number,
    limit: number,
  ) {
    const percentage = (spent / limit) * 100;

    return this.create({
      user_id: userId,
      type: "budget_alert",
      title: `Budget Alert: ${categoryName}`,
      message: `You've spent ${percentage.toFixed(
        0,
      )}% of your ${categoryName} budget (${spent.toFixed(2)}/${limit.toFixed(
        2,
      )})`,
      priority: percentage >= 100 ? "urgent" : "high",
    });
  },

  /**
   * Create subscription reminder notification
   */
  async createSubscriptionReminder(
    userId: string,
    subscriptionName: string,
    amount: number,
    daysUntil: number,
  ) {
    const message =
      daysUntil === 0
        ? `Your ${subscriptionName} subscription renews today for $${amount}`
        : `Your ${subscriptionName} subscription renews in ${daysUntil} day${
            daysUntil > 1 ? "s" : ""
          } for $${amount}`;

    return this.create({
      user_id: userId,
      type: "subscription_reminder",
      title: "Subscription Renewal",
      message,
      priority: daysUntil <= 1 ? "high" : "normal",
    });
  },

  /**
   * Create goal completed notification
   */
  async createGoalCompletedNotification(userId: string, goalName: string) {
    return this.create({
      user_id: userId,
      type: "goal_completed",
      title: "Goal Achieved! 🎉",
      message: `Congratulations! You've reached your goal: ${goalName}`,
      priority: "high",
    });
  },
};
