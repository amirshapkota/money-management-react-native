// Auto-generated TypeScript types for Supabase database
// Run: npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          phone: string | null;
          currency: string;
          timezone: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          currency?: string;
          timezone?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          currency?: string;
          timezone?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      transactions: {
        Row: {
          id: string;
          user_id: string;
          type: "income" | "expense";
          amount: number;
          currency: string;
          category: string;
          subcategory: string | null;
          description: string | null;
          transaction_date: string;
          payment_method: string | null;
          merchant: string | null;
          location: Json | null;
          tags: string[] | null;
          receipt_url: string | null;
          is_recurring: boolean;
          recurring_id: string | null;
          metadata: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: "income" | "expense";
          amount: number;
          currency?: string;
          category: string;
          subcategory?: string | null;
          description?: string | null;
          transaction_date: string;
          payment_method?: string | null;
          merchant?: string | null;
          location?: Json | null;
          tags?: string[] | null;
          receipt_url?: string | null;
          is_recurring?: boolean;
          recurring_id?: string | null;
          metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: "income" | "expense";
          amount?: number;
          currency?: string;
          category?: string;
          subcategory?: string | null;
          description?: string | null;
          transaction_date?: string;
          payment_method?: string | null;
          merchant?: string | null;
          location?: Json | null;
          tags?: string[] | null;
          receipt_url?: string | null;
          is_recurring?: boolean;
          recurring_id?: string | null;
          metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          category: string;
          amount: number;
          currency: string;
          billing_cycle: "daily" | "weekly" | "monthly" | "yearly";
          billing_day: number | null;
          next_billing_date: string;
          auto_pay: boolean;
          logo_url: string | null;
          color: string | null;
          website_url: string | null;
          status: "active" | "paused" | "cancelled";
          reminder_days: number;
          created_at: string;
          updated_at: string;
          cancelled_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          category: string;
          amount: number;
          currency?: string;
          billing_cycle: "daily" | "weekly" | "monthly" | "yearly";
          billing_day?: number | null;
          next_billing_date: string;
          auto_pay?: boolean;
          logo_url?: string | null;
          color?: string | null;
          website_url?: string | null;
          status?: "active" | "paused" | "cancelled";
          reminder_days?: number;
          created_at?: string;
          updated_at?: string;
          cancelled_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          category?: string;
          amount?: number;
          currency?: string;
          billing_cycle?: "daily" | "weekly" | "monthly" | "yearly";
          billing_day?: number | null;
          next_billing_date?: string;
          auto_pay?: boolean;
          logo_url?: string | null;
          color?: string | null;
          website_url?: string | null;
          status?: "active" | "paused" | "cancelled";
          reminder_days?: number;
          created_at?: string;
          updated_at?: string;
          cancelled_at?: string | null;
        };
      };
      budgets: {
        Row: {
          id: string;
          user_id: string;
          month: string;
          total_budget: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          month: string;
          total_budget?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          month?: string;
          total_budget?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      budget_categories: {
        Row: {
          id: string;
          budget_id: string;
          name: string;
          limit_amount: number;
          spent_amount: number;
          icon: string | null;
          color: string | null;
          alert_threshold: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          budget_id: string;
          name: string;
          limit_amount: number;
          spent_amount?: number;
          icon?: string | null;
          color?: string | null;
          alert_threshold?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          budget_id?: string;
          name?: string;
          limit_amount?: number;
          spent_amount?: number;
          icon?: string | null;
          color?: string | null;
          alert_threshold?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      savings_goals: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          target_amount: number;
          current_amount: number;
          color: string | null;
          target_date: string | null;
          status: "active" | "completed" | "cancelled";
          priority: number;
          auto_contribute: boolean;
          auto_contribute_amount: number | null;
          created_at: string;
          updated_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          target_amount: number;
          current_amount?: number;
          color?: string | null;
          target_date?: string | null;
          status?: "active" | "completed" | "cancelled";
          priority?: number;
          auto_contribute?: boolean;
          auto_contribute_amount?: number | null;
          created_at?: string;
          updated_at?: string;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          target_amount?: number;
          current_amount?: number;
          color?: string | null;
          target_date?: string | null;
          status?: "active" | "completed" | "cancelled";
          priority?: number;
          auto_contribute?: boolean;
          auto_contribute_amount?: number | null;
          created_at?: string;
          updated_at?: string;
          completed_at?: string | null;
        };
      };
      goal_contributions: {
        Row: {
          id: string;
          goal_id: string;
          amount: number;
          contribution_date: string;
          note: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          goal_id: string;
          amount: number;
          contribution_date: string;
          note?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          goal_id?: string;
          amount?: number;
          contribution_date?: string;
          note?: string | null;
          created_at?: string;
        };
      };
      uploaded_statements: {
        Row: {
          id: string;
          user_id: string;
          file_name: string;
          file_type: string;
          file_size: number;
          file_path: string;
          status: "pending" | "parsing" | "completed" | "failed";
          transaction_count: number;
          parsed_data: Json | null;
          error_message: string | null;
          uploaded_at: string;
          parsed_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          file_name: string;
          file_type: string;
          file_size: number;
          file_path: string;
          status?: "pending" | "parsing" | "completed" | "failed";
          transaction_count?: number;
          parsed_data?: Json | null;
          error_message?: string | null;
          uploaded_at?: string;
          parsed_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          file_name?: string;
          file_type?: string;
          file_size?: number;
          file_path?: string;
          status?: "pending" | "parsing" | "completed" | "failed";
          transaction_count?: number;
          parsed_data?: Json | null;
          error_message?: string | null;
          uploaded_at?: string;
          parsed_at?: string | null;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          action_url: string | null;
          read: boolean;
          priority: "low" | "normal" | "high" | "urgent";
          metadata: Json | null;
          created_at: string;
          read_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          action_url?: string | null;
          read?: boolean;
          priority?: "low" | "normal" | "high" | "urgent";
          metadata?: Json | null;
          created_at?: string;
          read_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: string;
          title?: string;
          message?: string;
          action_url?: string | null;
          read?: boolean;
          priority?: "low" | "normal" | "high" | "urgent";
          metadata?: Json | null;
          created_at?: string;
          read_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
