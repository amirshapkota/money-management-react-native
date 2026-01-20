import { supabase } from "@/lib/supabase";
import { Database } from "@/types/database.types";

type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];
type SubscriptionInsert =
  Database["public"]["Tables"]["subscriptions"]["Insert"];
type SubscriptionUpdate =
  Database["public"]["Tables"]["subscriptions"]["Update"];

export const subscriptionsService = {
  /**
   * Get all subscriptions for a user
   */
  async getAll(userId: string) {
    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .order("next_billing_date", { ascending: true });

    if (error) throw error;
    return data as Subscription[];
  },

  /**
   * Get active subscriptions only
   */
  async getActive(userId: string) {
    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .eq("status", "active")
      .order("next_billing_date", { ascending: true });

    if (error) throw error;
    return data as Subscription[];
  },

  /**
   * Get single subscription by ID
   */
  async getById(id: string) {
    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as Subscription;
  },

  /**
   * Get upcoming subscriptions (next N days)
   */
  async getUpcoming(userId: string, days = 7) {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + days);

    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .eq("status", "active")
      .gte("next_billing_date", today.toISOString().split("T")[0])
      .lte("next_billing_date", futureDate.toISOString().split("T")[0])
      .order("next_billing_date", { ascending: true });

    if (error) throw error;
    return data as Subscription[];
  },

  /**
   * Create a new subscription
   */
  async create(subscription: SubscriptionInsert) {
    const { data, error } = await supabase
      .from("subscriptions")
      .insert(subscription)
      .select()
      .single();

    if (error) throw error;
    return data as Subscription;
  },

  /**
   * Update a subscription
   */
  async update(id: string, updates: SubscriptionUpdate) {
    const { data, error } = await supabase
      .from("subscriptions")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Subscription;
  },

  /**
   * Delete a subscription
   */
  async delete(id: string) {
    const { error } = await supabase
      .from("subscriptions")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },

  /**
   * Pause a subscription
   */
  async pause(id: string) {
    const { data, error } = await supabase
      .from("subscriptions")
      .update({ status: "paused" })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Subscription;
  },

  /**
   * Resume a paused subscription
   */
  async resume(id: string) {
    const { data, error } = await supabase
      .from("subscriptions")
      .update({ status: "active" })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Subscription;
  },

  /**
   * Cancel a subscription
   */
  async cancel(id: string) {
    const { data, error } = await supabase
      .from("subscriptions")
      .update({
        status: "cancelled",
        cancelled_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Subscription;
  },

  /**
   * Calculate next billing date based on billing cycle
   */
  calculateNextBillingDate(
    currentDate: Date,
    billingCycle: "daily" | "weekly" | "monthly" | "yearly",
    billingDay?: number | null,
  ): Date {
    const nextDate = new Date(currentDate);

    switch (billingCycle) {
      case "daily":
        nextDate.setDate(nextDate.getDate() + 1);
        break;
      case "weekly":
        nextDate.setDate(nextDate.getDate() + 7);
        break;
      case "monthly":
        if (billingDay) {
          nextDate.setMonth(nextDate.getMonth() + 1);
          nextDate.setDate(billingDay);
        } else {
          nextDate.setMonth(nextDate.getMonth() + 1);
        }
        break;
      case "yearly":
        nextDate.setFullYear(nextDate.getFullYear() + 1);
        break;
    }

    return nextDate;
  },

  /**
   * Update next billing date after payment
   */
  async updateNextBillingDate(id: string) {
    const subscription = await this.getById(id);

    const nextDate = this.calculateNextBillingDate(
      new Date(subscription.next_billing_date),
      subscription.billing_cycle,
      subscription.billing_day,
    );

    return this.update(id, {
      next_billing_date: nextDate.toISOString().split("T")[0],
    });
  },

  /**
   * Get subscription statistics
   */
  async getSubscriptionStats(userId: string) {
    const subscriptions = await this.getAll(userId);
    const activeSubscriptions = subscriptions.filter(
      (s) => s.status === "active",
    );

    // Calculate monthly cost
    const monthlyCost = activeSubscriptions.reduce((sum, sub) => {
      let monthlyAmount = Number(sub.amount);

      switch (sub.billing_cycle) {
        case "daily":
          monthlyAmount = monthlyAmount * 30;
          break;
        case "weekly":
          monthlyAmount = monthlyAmount * 4.33;
          break;
        case "yearly":
          monthlyAmount = monthlyAmount / 12;
          break;
        // monthly stays as is
      }

      return sum + monthlyAmount;
    }, 0);

    // Calculate yearly cost
    const yearlyCost = monthlyCost * 12;

    // Group by category
    const categoryBreakdown = activeSubscriptions.reduce(
      (acc, sub) => {
        const category = sub.category || "Other";
        if (!acc[category]) {
          acc[category] = { count: 0, amount: 0 };
        }
        acc[category].count += 1;

        let monthlyAmount = Number(sub.amount);
        switch (sub.billing_cycle) {
          case "daily":
            monthlyAmount *= 30;
            break;
          case "weekly":
            monthlyAmount *= 4.33;
            break;
          case "yearly":
            monthlyAmount /= 12;
            break;
        }

        acc[category].amount += monthlyAmount;
        return acc;
      },
      {} as Record<string, { count: number; amount: number }>,
    );

    return {
      totalSubscriptions: subscriptions.length,
      activeSubscriptions: activeSubscriptions.length,
      pausedSubscriptions: subscriptions.filter((s) => s.status === "paused")
        .length,
      cancelledSubscriptions: subscriptions.filter(
        (s) => s.status === "cancelled",
      ).length,
      monthlyCost,
      yearlyCost,
      categoryBreakdown,
    };
  },

  /**
   * Get days until next billing
   */
  getDaysUntilBilling(nextBillingDate: string): number {
    const today = new Date();
    const billingDate = new Date(nextBillingDate);
    const diffTime = billingDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  },
};
