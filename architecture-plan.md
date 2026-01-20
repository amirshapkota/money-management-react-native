# Supabase Backend Architecture Plan

## Money Management Application

---

## TABLE OF CONTENTS

1. [Why Supabase](#why-supabase)
2. [Technology Stack](#technology-stack)
3. [Database Schema with RLS](#database-schema-with-rls)
4. [Authentication Strategy](#authentication-strategy)
5. [Real-time Features](#real-time-features)
6. [Storage & File Management](#storage--file-management)
7. [Edge Functions](#edge-functions)
8. [Client SDK Integration](#client-sdk-integration)
9. [Security & RLS Policies](#security--rls-policies)
10. [Scalability & Performance](#scalability--performance)
11. [Implementation Roadmap](#implementation-roadmap)

---

## 1. WHY SUPABASE

### Advantages for This Project

✅ **Instant Backend**: No server setup, managed PostgreSQL database
✅ **Built-in Auth**: Email, OAuth (Google, Apple), magic links, 2FA
✅ **Real-time**: WebSocket subscriptions out of the box
✅ **Auto-generated APIs**: REST and GraphQL APIs automatically created
✅ **Row Level Security**: Database-level security policies
✅ **Storage**: S3-compatible file storage with CDN
✅ **Edge Functions**: Serverless Deno functions for custom logic
✅ **Type Safety**: Auto-generated TypeScript types from schema
✅ **Cost Effective**: Free tier for development, scales with usage
✅ **React Native Support**: Official `@supabase/supabase-js` SDK

### What Supabase Replaces

| Traditional Stack        | Supabase Equivalent         |
| ------------------------ | --------------------------- |
| Node.js + Express        | Edge Functions (Deno)       |
| PostgreSQL (self-hosted) | Managed PostgreSQL          |
| Redis                    | Built-in caching            |
| JWT Auth                 | Supabase Auth               |
| Socket.io                | Realtime Subscriptions      |
| AWS S3                   | Supabase Storage            |
| Custom API               | Auto-generated REST/GraphQL |

---

## 2. TECHNOLOGY STACK

### Backend (Supabase)

- **Database**: PostgreSQL 15+ (managed)
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime (WebSocket)
- **Storage**: Supabase Storage (S3-compatible)
- **Functions**: Supabase Edge Functions (Deno)
- **APIs**: Auto-generated REST + GraphQL

### Frontend (React Native)

- **SDK**: `@supabase/supabase-js` v2
- **Auth**: `@supabase/auth-helpers-react-native`
- **Storage**: `AsyncStorage` for session persistence
- **Real-time**: Supabase Realtime channels

### AI & External Services

- **OCR**: AWS Textract / Google Cloud Vision
- **NLP**: OpenAI GPT-4 API
- **Email**: Supabase built-in email templates
- **Push Notifications**: Firebase Cloud Messaging (FCM)

### DevOps

- **Hosting**: Supabase Cloud (or self-hosted)
- **CI/CD**: GitHub Actions
- **Monitoring**: Supabase Dashboard + Sentry
- **Backups**: Automatic daily backups (Supabase)

---

## 3. DATABASE SCHEMA WITH RLS

### 3.1 Users Table (Extended)

Supabase Auth creates `auth.users` table automatically. We extend it with a public profile:

```sql
-- Public user profiles (references auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  avatar_url TEXT,
  phone VARCHAR(20),
  currency VARCHAR(3) DEFAULT 'USD',
  timezone VARCHAR(50) DEFAULT 'UTC',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

### 3.2 Transactions Table

```sql
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
  amount DECIMAL(15, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  category VARCHAR(100) NOT NULL,
  subcategory VARCHAR(100),
  description TEXT,
  transaction_date DATE NOT NULL,
  payment_method VARCHAR(50),
  merchant VARCHAR(255),
  location JSONB,
  tags TEXT[],
  receipt_url TEXT,
  is_recurring BOOLEAN DEFAULT FALSE,
  recurring_id UUID REFERENCES public.recurring_transactions(id),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX idx_transactions_date ON public.transactions(transaction_date DESC);
CREATE INDEX idx_transactions_category ON public.transactions(category);
CREATE INDEX idx_transactions_user_date ON public.transactions(user_id, transaction_date DESC);

-- Enable RLS
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own transactions"
  ON public.transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions"
  ON public.transactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own transactions"
  ON public.transactions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own transactions"
  ON public.transactions FOR DELETE
  USING (auth.uid() = user_id);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE ON public.transactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

### 3.3 Subscriptions Table

```sql
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  amount DECIMAL(15, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  billing_cycle VARCHAR(20) NOT NULL CHECK (billing_cycle IN ('daily', 'weekly', 'monthly', 'yearly')),
  billing_day INTEGER,
  next_billing_date DATE NOT NULL,
  auto_pay BOOLEAN DEFAULT TRUE,
  logo_url TEXT,
  color VARCHAR(7),
  website_url TEXT,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'paused', 'cancelled')),
  reminder_days INTEGER DEFAULT 3,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  cancelled_at TIMESTAMPTZ
);

CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_next_billing ON public.subscriptions(next_billing_date);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own subscriptions"
  ON public.subscriptions FOR ALL
  USING (auth.uid() = user_id);

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

### 3.4 Budgets & Categories

```sql
CREATE TABLE public.budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  month DATE NOT NULL,
  total_budget DECIMAL(15, 2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, month)
);

CREATE TABLE public.budget_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  budget_id UUID NOT NULL REFERENCES public.budgets(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  limit_amount DECIMAL(15, 2) NOT NULL,
  spent_amount DECIMAL(15, 2) DEFAULT 0,
  icon VARCHAR(50),
  color VARCHAR(7),
  alert_threshold DECIMAL(5, 2) DEFAULT 0.80,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_budgets_user_month ON public.budgets(user_id, month);
CREATE INDEX idx_budget_categories_budget_id ON public.budget_categories(budget_id);

ALTER TABLE public.budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budget_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own budgets"
  ON public.budgets FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own budget categories"
  ON public.budget_categories FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.budgets
      WHERE budgets.id = budget_categories.budget_id
      AND budgets.user_id = auth.uid()
    )
  );
```

---

### 3.5 Savings Goals

```sql
CREATE TABLE public.savings_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  target_amount DECIMAL(15, 2) NOT NULL,
  current_amount DECIMAL(15, 2) DEFAULT 0,
  color VARCHAR(7),
  target_date DATE,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  priority INTEGER DEFAULT 0,
  auto_contribute BOOLEAN DEFAULT FALSE,
  auto_contribute_amount DECIMAL(15, 2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE TABLE public.goal_contributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id UUID NOT NULL REFERENCES public.savings_goals(id) ON DELETE CASCADE,
  amount DECIMAL(15, 2) NOT NULL,
  contribution_date DATE NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_goals_user_id ON public.savings_goals(user_id);
CREATE INDEX idx_contributions_goal_id ON public.goal_contributions(goal_id);

ALTER TABLE public.savings_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goal_contributions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own goals"
  ON public.savings_goals FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own contributions"
  ON public.goal_contributions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.savings_goals
      WHERE savings_goals.id = goal_contributions.goal_id
      AND savings_goals.user_id = auth.uid()
    )
  );
```

---

### 3.6 Split Bill Groups & Expenses

```sql
CREATE TABLE public.split_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  currency VARCHAR(3) DEFAULT 'USD',
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'settled', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  settled_at TIMESTAMPTZ
);

CREATE TABLE public.group_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES public.split_groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  avatar_url TEXT,
  is_owner BOOLEAN DEFAULT FALSE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(group_id, user_id)
);

CREATE TABLE public.group_expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES public.split_groups(id) ON DELETE CASCADE,
  description VARCHAR(255) NOT NULL,
  amount DECIMAL(15, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  paid_by UUID NOT NULL REFERENCES public.group_members(id),
  expense_date DATE NOT NULL,
  category VARCHAR(100),
  receipt_url TEXT,
  split_type VARCHAR(20) DEFAULT 'equal' CHECK (split_type IN ('equal', 'percentage', 'exact', 'shares')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.expense_splits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  expense_id UUID NOT NULL REFERENCES public.group_expenses(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES public.group_members(id),
  amount DECIMAL(15, 2) NOT NULL,
  percentage DECIMAL(5, 2),
  shares INTEGER,
  paid BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_groups_created_by ON public.split_groups(created_by);
CREATE INDEX idx_members_group_id ON public.group_members(group_id);
CREATE INDEX idx_expenses_group_id ON public.group_expenses(group_id);

ALTER TABLE public.split_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expense_splits ENABLE ROW LEVEL SECURITY;

-- RLS: Users can view groups they're members of
CREATE POLICY "Users can view groups they belong to"
  ON public.split_groups FOR SELECT
  USING (
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM public.group_members
      WHERE group_members.group_id = split_groups.id
      AND group_members.user_id = auth.uid()
    )
  );

-- RLS: Only creators can update/delete groups
CREATE POLICY "Creators can manage groups"
  ON public.split_groups FOR ALL
  USING (auth.uid() = created_by);

-- RLS: Group members can view members
CREATE POLICY "Group members can view members"
  ON public.group_members FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.split_groups
      WHERE split_groups.id = group_members.group_id
      AND (split_groups.created_by = auth.uid() OR
           EXISTS (SELECT 1 FROM public.group_members gm
                   WHERE gm.group_id = split_groups.id
                   AND gm.user_id = auth.uid()))
    )
  );

-- RLS: Group members can manage expenses
CREATE POLICY "Group members can manage expenses"
  ON public.group_expenses FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.group_members
      WHERE group_members.group_id = group_expenses.group_id
      AND group_members.user_id = auth.uid()
    )
  );
```

---

### 3.7 Notifications

```sql
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  action_url TEXT,
  read BOOLEAN DEFAULT FALSE,
  priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  read_at TIMESTAMPTZ
);

CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_created_at ON public.notifications(created_at DESC);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own notifications"
  ON public.notifications FOR ALL
  USING (auth.uid() = user_id);
```

---

### 3.8 Uploaded Statements

```sql
CREATE TABLE public.uploaded_statements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(20) NOT NULL,
  file_size BIGINT NOT NULL,
  file_path TEXT NOT NULL, -- Supabase Storage path
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'parsing', 'completed', 'failed')),
  transaction_count INTEGER DEFAULT 0,
  parsed_data JSONB,
  error_message TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  parsed_at TIMESTAMPTZ
);

CREATE INDEX idx_statements_user_id ON public.uploaded_statements(user_id);

ALTER TABLE public.uploaded_statements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own statements"
  ON public.uploaded_statements FOR ALL
  USING (auth.uid() = user_id);
```

---

## 4. AUTHENTICATION STRATEGY

### 4.1 Supabase Auth Setup

```typescript
// Initialize Supabase client
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
```

### 4.2 Authentication Methods

**Email/Password**:

```typescript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: "user@example.com",
  password: "password",
  options: {
    data: {
      full_name: "John Doe",
    },
  },
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: "user@example.com",
  password: "password",
});

// Sign out
await supabase.auth.signOut();
```

**OAuth (Google, Apple)**:

```typescript
// Google OAuth
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: "google",
  options: {
    redirectTo: "moneyapp://auth/callback",
  },
});

// Apple OAuth
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: "apple",
  options: {
    redirectTo: "moneyapp://auth/callback",
  },
});
```

**Magic Link**:

```typescript
const { data, error } = await supabase.auth.signInWithOtp({
  email: "user@example.com",
  options: {
    emailRedirectTo: "moneyapp://auth/callback",
  },
});
```

**Password Reset**:

```typescript
// Request reset
await supabase.auth.resetPasswordForEmail("user@example.com", {
  redirectTo: "moneyapp://auth/reset-password",
});

// Update password
await supabase.auth.updateUser({
  password: "new-password",
});
```

### 4.3 Session Management

```typescript
// Listen to auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  if (event === "SIGNED_IN") {
    // User signed in
  } else if (event === "SIGNED_OUT") {
    // User signed out
  } else if (event === "TOKEN_REFRESHED") {
    // Token refreshed
  }
});

// Get current session
const {
  data: { session },
} = await supabase.auth.getSession();

// Get current user
const {
  data: { user },
} = await supabase.auth.getUser();
```

---

## 5. REAL-TIME FEATURES

### 5.1 Real-time Subscriptions

**Subscribe to Split Bill Updates**:

```typescript
// Subscribe to group expenses
const channel = supabase
  .channel("group-expenses")
  .on(
    "postgres_changes",
    {
      event: "*", // INSERT, UPDATE, DELETE
      schema: "public",
      table: "group_expenses",
      filter: `group_id=eq.${groupId}`,
    },
    (payload) => {
      console.log("Expense changed:", payload);
      // Update UI
    },
  )
  .subscribe();

// Unsubscribe
channel.unsubscribe();
```

**Subscribe to Notifications**:

```typescript
const notificationsChannel = supabase
  .channel("notifications")
  .on(
    "postgres_changes",
    {
      event: "INSERT",
      schema: "public",
      table: "notifications",
      filter: `user_id=eq.${userId}`,
    },
    (payload) => {
      // Show notification
      showNotification(payload.new);
    },
  )
  .subscribe();
```

**Presence (Online/Offline)**:

```typescript
const presenceChannel = supabase.channel("group-presence");

presenceChannel
  .on("presence", { event: "sync" }, () => {
    const state = presenceChannel.presenceState();
    console.log("Online users:", state);
  })
  .on("presence", { event: "join" }, ({ key, newPresences }) => {
    console.log("User joined:", newPresences);
  })
  .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
    console.log("User left:", leftPresences);
  })
  .subscribe(async (status) => {
    if (status === "SUBSCRIBED") {
      await presenceChannel.track({
        user_id: userId,
        online_at: new Date().toISOString(),
      });
    }
  });
```

---

## 6. STORAGE & FILE MANAGEMENT

### 6.1 Storage Buckets

```sql
-- Create storage buckets (via Supabase Dashboard or SQL)
INSERT INTO storage.buckets (id, name, public)
VALUES
  ('avatars', 'avatars', true),
  ('receipts', 'receipts', false),
  ('statements', 'statements', false);
```

### 6.2 Storage Policies

```sql
-- Avatars: Public read, authenticated write
CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Receipts: Private, user-only access
CREATE POLICY "Users can access own receipts"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'receipts' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can upload own receipts"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'receipts' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Statements: Private, user-only access
CREATE POLICY "Users can access own statements"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'statements' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can upload own statements"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'statements' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
```

### 6.3 File Upload/Download

```typescript
// Upload avatar
const file = {
  uri: "file:///path/to/image.jpg",
  type: "image/jpeg",
  name: "avatar.jpg",
};

const { data, error } = await supabase.storage
  .from("avatars")
  .upload(`${userId}/avatar.jpg`, file, {
    cacheControl: "3600",
    upsert: true,
  });

// Get public URL
const {
  data: { publicUrl },
} = supabase.storage.from("avatars").getPublicUrl(`${userId}/avatar.jpg`);

// Upload statement (private)
const { data, error } = await supabase.storage
  .from("statements")
  .upload(`${userId}/${fileName}`, file);

// Download file
const { data, error } = await supabase.storage
  .from("statements")
  .download(`${userId}/${fileName}`);

// Delete file
await supabase.storage.from("statements").remove([`${userId}/${fileName}`]);
```

---

## 7. EDGE FUNCTIONS

### 7.1 AI Statement Parser

**Function**: `parse-statement`

```typescript
// supabase/functions/parse-statement/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    const { statementId } = await req.json();

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    // Get statement from database
    const { data: statement } = await supabaseClient
      .from("uploaded_statements")
      .select("*")
      .eq("id", statementId)
      .single();

    // Download file from storage
    const { data: fileData } = await supabaseClient.storage
      .from("statements")
      .download(statement.file_path);

    // Call AWS Textract or Google Vision API
    const extractedText = await extractTextFromPDF(fileData);

    // Parse transactions using AI (OpenAI GPT-4)
    const transactions = await parseTransactionsWithAI(extractedText);

    // Update statement status
    await supabaseClient
      .from("uploaded_statements")
      .update({
        status: "completed",
        parsed_data: transactions,
        transaction_count: transactions.length,
        parsed_at: new Date().toISOString(),
      })
      .eq("id", statementId);

    return new Response(JSON.stringify({ success: true, transactions }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
```

**Invoke from client**:

```typescript
const { data, error } = await supabase.functions.invoke("parse-statement", {
  body: { statementId: "uuid" },
});
```

---

### 7.2 Subscription Reminder

**Function**: `subscription-reminders` (Cron job)

```typescript
// supabase/functions/subscription-reminders/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  );

  // Get subscriptions due in next 3 days
  const threeDaysFromNow = new Date();
  threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

  const { data: subscriptions } = await supabaseClient
    .from("subscriptions")
    .select("*, profiles(*)")
    .eq("status", "active")
    .lte("next_billing_date", threeDaysFromNow.toISOString());

  // Create notifications
  for (const sub of subscriptions) {
    await supabaseClient.from("notifications").insert({
      user_id: sub.user_id,
      type: "subscription",
      title: `${sub.name} renewal coming up`,
      message: `Your ${sub.name} subscription will renew on ${sub.next_billing_date} for $${sub.amount}`,
      priority: "high",
    });
  }

  return new Response(JSON.stringify({ processed: subscriptions.length }), {
    headers: { "Content-Type": "application/json" },
  });
});
```

**Schedule with cron**:

```bash
# Run daily at 9 AM
supabase functions deploy subscription-reminders --schedule "0 9 * * *"
```

---

### 7.3 Budget Alert

**Function**: `budget-alerts` (Triggered on transaction insert)

```typescript
// Database trigger to call edge function
CREATE OR REPLACE FUNCTION check_budget_on_transaction()
RETURNS TRIGGER AS $$
BEGIN
  -- Call edge function via HTTP
  PERFORM net.http_post(
    url := 'https://your-project.supabase.co/functions/v1/budget-alerts',
    headers := jsonb_build_object('Content-Type', 'application/json'),
    body := jsonb_build_object('transaction_id', NEW.id)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_transaction_created
  AFTER INSERT ON public.transactions
  FOR EACH ROW EXECUTE FUNCTION check_budget_on_transaction();
```

---

## 8. CLIENT SDK INTEGRATION

### 8.1 React Native Setup

```typescript
// src/lib/supabase.ts
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

// Type-safe database types (auto-generated)
export type Database = {
  public: {
    Tables: {
      profiles: { ... }
      transactions: { ... }
      // ... all tables
    }
  }
}
```

### 8.2 CRUD Operations

**Create Transaction**:

```typescript
const { data, error } = await supabase
  .from("transactions")
  .insert({
    type: "expense",
    amount: 50.0,
    category: "Food & Drink",
    transaction_date: "2024-01-20",
    description: "Lunch",
  })
  .select()
  .single();
```

**Read Transactions**:

```typescript
const { data, error } = await supabase
  .from("transactions")
  .select("*")
  .eq("user_id", userId)
  .order("transaction_date", { ascending: false })
  .limit(50);
```

**Update Transaction**:

```typescript
const { data, error } = await supabase
  .from("transactions")
  .update({ amount: 55.0 })
  .eq("id", transactionId);
```

**Delete Transaction**:

```typescript
const { data, error } = await supabase
  .from("transactions")
  .delete()
  .eq("id", transactionId);
```

**Complex Queries**:

```typescript
// Get budget with categories and calculated spent amounts
const { data, error } = await supabase
  .from("budgets")
  .select(
    `
    *,
    budget_categories (
      *
    )
  `,
  )
  .eq("user_id", userId)
  .eq("month", "2024-01")
  .single();

// Get groups with members and expenses
const { data, error } = await supabase
  .from("split_groups")
  .select(
    `
    *,
    group_members (*),
    group_expenses (
      *,
      expense_splits (*)
    )
  `,
  )
  .eq("created_by", userId);
```

---

## 9. SECURITY & RLS POLICIES

### 9.1 Security Best Practices

✅ **Row Level Security (RLS)**: Enabled on all tables
✅ **Service Role Key**: Only used in Edge Functions (server-side)
✅ **Anon Key**: Used in client (safe to expose)
✅ **JWT Tokens**: Auto-managed by Supabase Auth
✅ **HTTPS Only**: All connections encrypted
✅ **API Rate Limiting**: Built-in (configurable)

### 9.2 RLS Policy Patterns

**User-owned resources**:

```sql
CREATE POLICY "Users can manage own data"
  ON table_name FOR ALL
  USING (auth.uid() = user_id);
```

**Shared resources (groups)**:

```sql
CREATE POLICY "Group members can view"
  ON table_name FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM group_members
      WHERE group_members.group_id = table_name.group_id
      AND group_members.user_id = auth.uid()
    )
  );
```

**Public read, authenticated write**:

```sql
CREATE POLICY "Public read"
  ON table_name FOR SELECT
  USING (true);

CREATE POLICY "Authenticated write"
  ON table_name FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');
```

---

## 10. SCALABILITY & PERFORMANCE

### 10.1 Database Optimization

**Indexes**:

- Already created on foreign keys
- Add composite indexes for common queries
- Use partial indexes for filtered queries

**Connection Pooling**:

- Supabase uses PgBouncer automatically
- No manual configuration needed

**Caching**:

```typescript
// Client-side caching with React Query
import { useQuery } from "@tanstack/react-query";

const { data, isLoading } = useQuery({
  queryKey: ["transactions", userId],
  queryFn: async () => {
    const { data } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId);
    return data;
  },
  staleTime: 5 * 60 * 1000, // 5 minutes
});
```

### 10.2 Scaling Strategy

**Supabase Tiers**:

- **Free**: 500 MB database, 1 GB file storage, 2 GB bandwidth
- **Pro** ($25/mo): 8 GB database, 100 GB storage, 250 GB bandwidth
- **Team** ($599/mo): Dedicated resources, custom limits
- **Enterprise**: Custom pricing, dedicated infrastructure

**Auto-scaling**:

- Database: Automatic read replicas (Pro+)
- Storage: Unlimited scaling
- Edge Functions: Auto-scale with traffic
- Bandwidth: Pay-as-you-go

---

## 11. IMPLEMENTATION ROADMAP

### Phase 1: Setup & Authentication (Week 1)

- [ ] Create Supabase project
- [ ] Set up database schema
- [ ] Enable RLS policies
- [ ] Configure Supabase client in React Native
- [ ] Implement authentication (email, Google, Apple)
- [ ] Create profile management

### Phase 2: Core Features (Weeks 2-4)

- [ ] Transactions CRUD
- [ ] Budgets & categories
- [ ] Savings goals
- [ ] Subscriptions management
- [ ] Real-time listeners for updates

### Phase 3: Advanced Features (Weeks 5-6)

- [ ] Split bill groups
- [ ] Real-time collaboration
- [ ] File upload (receipts, statements)
- [ ] Edge function for AI parsing
- [ ] Notifications system

### Phase 4: Polish & Optimization (Week 7)

- [ ] Implement caching strategy
- [ ] Add loading states
- [ ] Error handling
- [ ] Offline support
- [ ] Performance optimization

### Phase 5: Testing & Deployment (Week 8)

- [ ] Integration testing
- [ ] Security audit
- [ ] Load testing
- [ ] Production deployment
- [ ] Monitoring setup

---

## COST ESTIMATION

### Development (Free Tier)

- **Database**: 500 MB (sufficient for development)
- **Storage**: 1 GB (sufficient for testing)
- **Bandwidth**: 2 GB/month
- **Cost**: $0/month

### Production (Pro Tier - 10K Users)

- **Supabase Pro**: $25/month
- **Additional Storage**: ~$10/month (10 GB)
- **Additional Bandwidth**: ~$20/month (50 GB)
- **Edge Functions**: ~$10/month (1M invocations)
- **External APIs** (OpenAI, Textract): ~$50/month
- **Total**: ~$115/month

### Scale (100K Users)

- **Supabase Team**: $599/month
- **Additional resources**: ~$200/month
- **External APIs**: ~$200/month
- **Total**: ~$1000/month

---

## SUMMARY

### Key Benefits

✅ **Rapid Development**: 50% faster than traditional backend
✅ **Type Safety**: Auto-generated TypeScript types
✅ **Real-time**: Built-in WebSocket subscriptions
✅ **Security**: Database-level RLS policies
✅ **Scalability**: Auto-scaling infrastructure
✅ **Cost Effective**: Free tier + pay-as-you-grow
✅ **Developer Experience**: Excellent documentation and tooling

### Migration from Current App

1. Replace AsyncStorage with Supabase database
2. Replace AuthContext with Supabase Auth
3. Add real-time listeners for split bill
4. Implement file upload for statements
5. Deploy Edge Functions for AI parsing

**Estimated Timeline**: 8 weeks with 2-3 developers
**Estimated Cost**: $115/month for 10K users
