-- =====================================================
-- SPLIT BILL TABLES
-- Money Management App - Supabase Backend
-- =====================================================

-- =====================================================
-- 1. SPLIT GROUPS TABLE
-- =====================================================

CREATE TABLE public.split_groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  currency VARCHAR(3) DEFAULT 'USD',
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'settled', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  settled_at TIMESTAMPTZ
);

CREATE INDEX idx_split_groups_created_by ON public.split_groups(created_by);
CREATE INDEX idx_split_groups_status ON public.split_groups(status);

-- =====================================================
-- 2. GROUP MEMBERS TABLE
-- =====================================================

CREATE TABLE public.group_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID NOT NULL REFERENCES public.split_groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  avatar_url TEXT,
  is_owner BOOLEAN DEFAULT FALSE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(group_id, user_id),
  UNIQUE(group_id, email)
);

CREATE INDEX idx_group_members_group_id ON public.group_members(group_id);
CREATE INDEX idx_group_members_user_id ON public.group_members(user_id);

-- =====================================================
-- 3. GROUP EXPENSES TABLE
-- =====================================================

CREATE TABLE public.group_expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID NOT NULL REFERENCES public.split_groups(id) ON DELETE CASCADE,
  description VARCHAR(255) NOT NULL,
  amount DECIMAL(15, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  paid_by UUID NOT NULL REFERENCES public.group_members(id),
  expense_date DATE NOT NULL,
  category VARCHAR(100),
  receipt_url TEXT,
  split_type VARCHAR(20) DEFAULT 'equal' CHECK (split_type IN ('equal', 'percentage', 'exact', 'shares')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_group_expenses_group_id ON public.group_expenses(group_id);
CREATE INDEX idx_group_expenses_paid_by ON public.group_expenses(paid_by);
CREATE INDEX idx_group_expenses_date ON public.group_expenses(expense_date DESC);

-- =====================================================
-- 4. EXPENSE SPLITS TABLE
-- =====================================================

CREATE TABLE public.expense_splits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  expense_id UUID NOT NULL REFERENCES public.group_expenses(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES public.group_members(id) ON DELETE CASCADE,
  amount DECIMAL(15, 2) NOT NULL,
  percentage DECIMAL(5, 2),
  shares INTEGER,
  paid BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_expense_splits_expense_id ON public.expense_splits(expense_id);
CREATE INDEX idx_expense_splits_member_id ON public.expense_splits(member_id);

-- =====================================================
-- TRIGGERS
-- =====================================================

CREATE TRIGGER update_split_groups_updated_at
  BEFORE UPDATE ON public.split_groups
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_group_expenses_updated_at
  BEFORE UPDATE ON public.group_expenses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY POLICIES
-- =====================================================

ALTER TABLE public.split_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expense_splits ENABLE ROW LEVEL SECURITY;

-- SPLIT GROUPS POLICIES
-- Users can view groups they created or are members of
CREATE POLICY "Users can view their groups"
  ON public.split_groups FOR SELECT
  USING (
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM public.group_members
      WHERE group_members.group_id = split_groups.id
      AND group_members.user_id = auth.uid()
    )
  );

-- Only creators can create groups
CREATE POLICY "Users can create groups"
  ON public.split_groups FOR INSERT
  WITH CHECK (auth.uid() = created_by);

-- Only creators can update/delete groups
CREATE POLICY "Creators can update groups"
  ON public.split_groups FOR UPDATE
  USING (auth.uid() = created_by);

CREATE POLICY "Creators can delete groups"
  ON public.split_groups FOR DELETE
  USING (auth.uid() = created_by);

-- GROUP MEMBERS POLICIES
-- Members can view other members in their groups
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

-- Group owners can add members
CREATE POLICY "Group owners can add members"
  ON public.group_members FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.split_groups
      WHERE split_groups.id = group_members.group_id
      AND split_groups.created_by = auth.uid()
    )
  );

-- Group owners can remove members
CREATE POLICY "Group owners can remove members"
  ON public.group_members FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.split_groups
      WHERE split_groups.id = group_members.group_id
      AND split_groups.created_by = auth.uid()
    )
  );

-- GROUP EXPENSES POLICIES
-- Group members can view expenses
CREATE POLICY "Group members can view expenses"
  ON public.group_expenses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.group_members
      WHERE group_members.group_id = group_expenses.group_id
      AND group_members.user_id = auth.uid()
    )
  );

-- Group members can add expenses
CREATE POLICY "Group members can add expenses"
  ON public.group_expenses FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.group_members
      WHERE group_members.group_id = group_expenses.group_id
      AND group_members.user_id = auth.uid()
    )
  );

-- Users can update expenses they paid for
CREATE POLICY "Users can update their expenses"
  ON public.group_expenses FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.group_members
      WHERE group_members.id = group_expenses.paid_by
      AND group_members.user_id = auth.uid()
    )
  );

-- Users can delete expenses they paid for
CREATE POLICY "Users can delete their expenses"
  ON public.group_expenses FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.group_members
      WHERE group_members.id = group_expenses.paid_by
      AND group_members.user_id = auth.uid()
    )
  );

-- EXPENSE SPLITS POLICIES
-- Group members can view splits
CREATE POLICY "Group members can view splits"
  ON public.expense_splits FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.group_expenses ge
      JOIN public.group_members gm ON gm.group_id = ge.group_id
      WHERE ge.id = expense_splits.expense_id
      AND gm.user_id = auth.uid()
    )
  );

-- Group members can add splits when adding expenses
CREATE POLICY "Group members can add splits"
  ON public.expense_splits FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.group_expenses ge
      JOIN public.group_members gm ON gm.group_id = ge.group_id
      WHERE ge.id = expense_splits.expense_id
      AND gm.user_id = auth.uid()
    )
  );

-- Members can update their own split status
CREATE POLICY "Members can update their splits"
  ON public.expense_splits FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.group_members
      WHERE group_members.id = expense_splits.member_id
      AND group_members.user_id = auth.uid()
    )
  );
