# Backend Services & Hooks - Complete Guide

## 🎉 What's Been Built

All core backend services and React Query hooks are now complete and ready to use!

---

## 📦 Services Created

### 1. **Transactions Service** ✅

**File:** `src/services/transactions.service.ts`

**Features:**

- CRUD operations (Create, Read, Update, Delete)
- Filter by date range, category, type
- Calculate statistics (income, expense, balance)
- Get spending by category

**Usage:**

```typescript
import { transactionsService } from "@/services/transactions.service";

// Get all transactions
const transactions = await transactionsService.getAll(userId, 50);

// Get by date range
const filtered = await transactionsService.getByDateRange(
  userId,
  "2026-01-01",
  "2026-01-31",
);

// Create transaction
const newTxn = await transactionsService.create({
  user_id: userId,
  type: "expense",
  amount: 50.0,
  category: "Food & Drink",
  transaction_date: "2026-01-20",
});
```

---

### 2. **Budgets Service** ✅

**File:** `src/services/budgets.service.ts`

**Features:**

- CRUD for budgets and categories
- Get budget by month
- Create budget with default categories
- Auto-calculate spent amounts from transactions
- Get budget summary statistics

**Usage:**

```typescript
import { budgetsService } from "@/services/budgets.service";

// Get budget for January 2026
const budget = await budgetsService.getByMonth(userId, "2026-01");

// Create budget with defaults
const newBudget = await budgetsService.createWithDefaults(
  userId,
  "2026-02",
  2000,
);

// Get summary
const summary = await budgetsService.getBudgetSummary(userId, "2026-01");
// Returns: totalLimit, totalSpent, remaining, percentageUsed, etc.
```

---

### 3. **Goals Service** ✅

**File:** `src/services/goals.service.ts`

**Features:**

- CRUD for savings goals
- Add contributions to goals
- Auto-mark as completed when target reached
- Calculate progress, days remaining, required monthly contribution
- Get goals summary

**Usage:**

```typescript
import { goalsService } from "@/services/goals.service";

// Create goal
const goal = await goalsService.create({
  user_id: userId,
  name: "MacBook Pro",
  target_amount: 2500,
  target_date: "2026-12-31",
});

// Add contribution
await goalsService.addContribution({
  goal_id: goalId,
  amount: 100,
  contribution_date: "2026-01-20",
});
// Auto-updates current_amount and marks completed if target reached
```

---

### 4. **Subscriptions Service** ✅

**File:** `src/services/subscriptions.service.ts`

**Features:**

- CRUD for subscriptions
- Get upcoming renewals
- Pause/Resume/Cancel subscriptions
- Calculate next billing date automatically
- Get subscription statistics (monthly/yearly cost)

**Usage:**

```typescript
import { subscriptionsService } from "@/services/subscriptions.service";

// Create subscription
const sub = await subscriptionsService.create({
  user_id: userId,
  name: "Netflix Premium",
  amount: 15.99,
  billing_cycle: "monthly",
  next_billing_date: "2026-02-20",
  category: "Entertainment",
});

// Get upcoming (next 7 days)
const upcoming = await subscriptionsService.getUpcoming(userId, 7);

// Get stats
const stats = await subscriptionsService.getSubscriptionStats(userId);
// Returns: totalSubscriptions, monthlyCost, yearlyCost, categoryBreakdown
```

---

### 5. **Split Bill Service** ✅

**File:** `src/services/splitbill.service.ts`

**Features:**

- Create/manage split groups
- Add/remove members
- Add expenses with automatic split calculation
- Calculate balances (who owes what)
- Calculate debts (optimized settlement)
- Settle up groups

**Usage:**

```typescript
import { splitBillService } from "@/services/splitbill.service";

// Create group
const group = await splitBillService.createGroup(
  "Weekend Trip",
  "Vacation expenses",
  userId,
  ["Alice", "Bob", "Charlie"],
);

// Add expense
await splitBillService.addExpense(
  groupId,
  "Hotel",
  300,
  payerMemberId,
  [member1Id, member2Id, member3Id],
  "2026-01-20",
  "Accommodation",
);

// Get summary with balances and debts
const summary = await splitBillService.getGroupSummary(groupId);
```

---

### 6. **Notifications Service** ✅

**File:** `src/services/notifications.service.ts`

**Features:**

- CRUD for notifications
- Get unread notifications
- Mark as read (single or all)
- Helper methods for budget alerts, subscription reminders, goal completions

**Usage:**

```typescript
import { notificationsService } from "@/services/notifications.service";

// Create budget alert
await notificationsService.createBudgetAlert(
  userId,
  "Groceries",
  280, // spent
  300, // limit
);

// Mark as read
await notificationsService.markAsRead(notificationId);
```

---

### 7. **Insights Service** ✅

**File:** `src/services/insights.service.ts`

**Features:**

- Spending trends over time (day/week/month)
- Category breakdown with percentages
- Monthly comparisons
- Top merchants
- Average daily spending
- Budget adherence metrics
- Income vs expense trend

**Usage:**

```typescript
import { insightsService } from "@/services/insights.service";

// Get spending trends
const trends = await insightsService.getSpendingTrends(
  userId,
  "2026-01-01",
  "2026-01-31",
  "day",
);

// Get category breakdown
const breakdown = await insightsService.getCategoryBreakdown(
  userId,
  "2026-01-01",
  "2026-01-31",
);
```

---

## 🎣 React Query Hooks Created

All services have corresponding React Query hooks for easy data fetching and mutations!

### **Transactions Hooks**

`src/hooks/useTransactions.ts`

```typescript
import {
  useTransactions,
  useTransactionsByDateRange,
  useTransactionStats,
  useCreateTransaction,
  useUpdateTransaction,
  useDeleteTransaction,
} from "@/hooks/useTransactions";

// In your component
const { data: transactions, isLoading } = useTransactions(50);
const createTxn = useCreateTransaction();

await createTxn.mutateAsync({
  type: "expense",
  amount: 50,
  category: "Food",
});
```

### **Budgets Hooks**

`src/hooks/useBudgets.ts`

```typescript
import {
  useBudgetByMonth,
  useBudgetSummary,
  useCreateBudgetWithDefaults,
  useCreateBudgetCategory,
} from "@/hooks/useBudgets";

const { data: budget } = useBudgetByMonth("2026-01");
const { data: summary } = useBudgetSummary("2026-01");
```

### **Goals Hooks**

`src/hooks/useGoals.ts`

```typescript
import {
  useGoals,
  useActiveGoals,
  useGoalsSummary,
  useCreateGoal,
  useAddContribution,
} from "@/hooks/useGoals";

const { data: goals } = useActiveGoals();
const addContribution = useAddContribution();
```

### **Subscriptions Hooks**

`src/hooks/useSubscriptions.ts`

```typescript
import {
  useSubscriptions,
  useUpcomingSubscriptions,
  useSubscriptionStats,
  useCreateSubscription,
  usePauseSubscription,
} from "@/hooks/useSubscriptions";

const { data: upcoming } = useUpcomingSubscriptions(7);
const { data: stats } = useSubscriptionStats();
```

### **Split Bill Hooks**

`src/hooks/useSplitBill.ts`

```typescript
import {
  useSplitGroups,
  useSplitGroup,
  useSplitGroupSummary,
  useCreateSplitGroup,
  useAddGroupExpense,
  useRealtimeGroupExpenses,
} from "@/hooks/useSplitBill";

const { data: groups } = useSplitGroups();
const { data: summary } = useSplitGroupSummary(groupId);

// Real-time updates
useRealtimeGroupExpenses(groupId); // Auto-refreshes on changes
```

### **Notifications Hooks**

`src/hooks/useNotifications.ts`

```typescript
import {
  useNotifications,
  useUnreadNotifications,
  useUnreadNotificationsCount,
  useMarkNotificationAsRead,
  useRealtimeNotifications,
} from "@/hooks/useNotifications";

const { data: notifications } = useNotifications();
const { data: unreadCount } = useUnreadNotificationsCount();

// Real-time updates
useRealtimeNotifications(); // Auto-refreshes on new notifications
```

### **Insights Hooks**

`src/hooks/useInsights.ts`

```typescript
import {
  useSpendingTrends,
  useCategoryBreakdown,
  useMonthlyComparison,
  useIncomeVsExpenseTrend,
  useBudgetAdherence,
} from "@/hooks/useInsights";

const { data: trends } = useSpendingTrends("2026-01-01", "2026-01-31", "day");
const { data: breakdown } = useCategoryBreakdown("2026-01-01", "2026-01-31");
```

---

## 🗄️ Database Migration

**Critical:** You need to run the split bill migration!

**File:** `supabase/migrations/003_split_bill_tables.sql`

**Tables Created:**

- `split_groups` - Group information
- `group_members` - Members in each group
- `group_expenses` - Expenses in groups
- `expense_splits` - How expenses are split among members

**To Apply:**

1. Open Supabase Dashboard → SQL Editor
2. Copy contents of `003_split_bill_tables.sql`
3. Run the SQL
4. Verify tables appear in Table Editor

---

## 🚀 Next Steps

### **Immediate (Run in Supabase):**

1. ✅ Run migration `001_initial_schema.sql` (if not done)
2. ✅ Run migration `002_rls_policies.sql` (if not done)
3. ⚠️ **RUN** `003_split_bill_tables.sql` (NEW - critical for split bill feature)

### **Update Screens:**

Now you can replace mock data in screens with real backend data!

**Example - BudgetScreen:**

```typescript
// Before (mock data)
const CATEGORIES = [...hardcoded data...];

// After (real data)
import { useBudgetByMonth } from "@/hooks/useBudgets";

const { data: budget, isLoading } = useBudgetByMonth("2026-01");

if (isLoading) return <LoadingSpinner />;

const categories = budget?.budget_categories || [];
```

**Example - GoalScreen:**

```typescript
import { useActiveGoals } from "@/hooks/useGoals";

const { data: goals } = useActiveGoals();
```

**Example - SubscriptionsScreen:**

```typescript
import {
  useSubscriptions,
  useUpcomingSubscriptions,
} from "@/hooks/useSubscriptions";

const { data: subscriptions } = useSubscriptions();
const { data: upcoming } = useUpcomingSubscriptions(7);
```

---

## 📊 File Structure

```
src/
├── services/
│   ├── transactions.service.ts     ✅ Complete
│   ├── budgets.service.ts          ✅ Complete
│   ├── goals.service.ts            ✅ Complete
│   ├── subscriptions.service.ts    ✅ Complete
│   ├── splitbill.service.ts        ✅ Complete
│   ├── notifications.service.ts    ✅ Complete
│   └── insights.service.ts         ✅ Complete
│
├── hooks/
│   ├── useTransactions.ts          ✅ Complete
│   ├── useBudgets.ts               ✅ Complete
│   ├── useGoals.ts                 ✅ Complete
│   ├── useSubscriptions.ts         ✅ Complete
│   ├── useSplitBill.ts             ✅ Complete (with real-time)
│   ├── useNotifications.ts         ✅ Complete (with real-time)
│   └── useInsights.ts              ✅ Complete
│
└── lib/
    └── supabase.ts                 ✅ Already configured

supabase/
└── migrations/
    ├── 001_initial_schema.sql      ✅ Existing
    ├── 002_rls_policies.sql        ✅ Existing
    └── 003_split_bill_tables.sql   ✅ NEW - MUST RUN
```

---

## ✅ Backend Completion Status

| Module         | Status  | Files Created                  |
| -------------- | ------- | ------------------------------ |
| Infrastructure | ✅ 100% | supabase.ts, database.types.ts |
| Authentication | ✅ 100% | SupabaseAuthContext.tsx        |
| Transactions   | ✅ 100% | service + 9 hooks              |
| Budgets        | ✅ 100% | service + 10 hooks             |
| Goals          | ✅ 100% | service + 8 hooks              |
| Subscriptions  | ✅ 100% | service + 9 hooks              |
| Split Bill     | ✅ 100% | service + 11 hooks + real-time |
| Notifications  | ✅ 100% | service + 8 hooks + real-time  |
| Insights       | ✅ 100% | service + 7 hooks              |

**Overall Backend: ~85% Complete!**

---

## 🎯 What's Left (Optional Enhancements)

1. **File Upload Service** (for receipts/statements)
   - Create storage buckets in Supabase
   - Implement storage.service.ts

2. **Search Service** (full-text search)
   - Implement search.service.ts

3. **Edge Functions** (advanced features)
   - AI statement parser
   - Subscription reminders (cron)
   - Budget alerts (triggers)

---

## 💡 Usage Tips

### **Auto-Invalidation**

All mutation hooks automatically invalidate queries, so UI updates automatically:

```typescript
const createGoal = useCreateGoal();
await createGoal.mutateAsync({ name: "New Goal", target_amount: 1000 });
// useGoals() hook automatically refetches! ✨
```

### **Loading States**

```typescript
const { data, isLoading, error } = useTransactions();

if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} />;
return <TransactionList data={data} />;
```

### **Real-time Updates**

Just add to your component:

```typescript
useRealtimeGroupExpenses(groupId); // Listens to expense changes
useRealtimeNotifications(); // Listens to new notifications
```

---

## 🎉 Summary

You now have:

- ✅ 7 complete backend services
- ✅ 60+ React Query hooks
- ✅ Real-time updates for split bills & notifications
- ✅ Automatic query invalidation
- ✅ TypeScript type safety throughout
- ✅ Optimized balance & debt calculations
- ✅ Comprehensive analytics & insights

**Ready to integrate into your screens!** 🚀
