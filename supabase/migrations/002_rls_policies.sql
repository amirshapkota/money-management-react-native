-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Money Management App - Supabase Backend
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budget_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.savings_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goal_contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.uploaded_statements ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- PROFILES POLICIES
-- =====================================================

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- =====================================================
-- TRANSACTIONS POLICIES
-- =====================================================

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

-- =====================================================
-- SUBSCRIPTIONS POLICIES
-- =====================================================

CREATE POLICY "Users can manage own subscriptions"
  ON public.subscriptions FOR ALL
  USING (auth.uid() = user_id);

-- =====================================================
-- BUDGETS POLICIES
-- =====================================================

CREATE POLICY "Users can manage own budgets"
  ON public.budgets FOR ALL
  USING (auth.uid() = user_id);

-- =====================================================
-- BUDGET CATEGORIES POLICIES
-- =====================================================

CREATE POLICY "Users can manage own budget categories"
  ON public.budget_categories FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.budgets
      WHERE budgets.id = budget_categories.budget_id
      AND budgets.user_id = auth.uid()
    )
  );

-- =====================================================
-- SAVINGS GOALS POLICIES
-- =====================================================

CREATE POLICY "Users can manage own goals"
  ON public.savings_goals FOR ALL
  USING (auth.uid() = user_id);

-- =====================================================
-- GOAL CONTRIBUTIONS POLICIES
-- =====================================================

CREATE POLICY "Users can manage own contributions"
  ON public.goal_contributions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.savings_goals
      WHERE savings_goals.id = goal_contributions.goal_id
      AND savings_goals.user_id = auth.uid()
    )
  );

-- =====================================================
-- NOTIFICATIONS POLICIES
-- =====================================================

CREATE POLICY "Users can manage own notifications"
  ON public.notifications FOR ALL
  USING (auth.uid() = user_id);

-- =====================================================
-- UPLOADED STATEMENTS POLICIES
-- =====================================================

CREATE POLICY "Users can manage own statements"
  ON public.uploaded_statements FOR ALL
  USING (auth.uid() = user_id);
