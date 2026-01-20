# Supabase Backend Implementation Plan

## Money Management App - Complete Integration Guide

---

## OVERVIEW

This plan outlines the step-by-step implementation of Supabase backend integration into the existing React Native money management application.

**Timeline**: 8 weeks
**Team Size**: 2-3 developers
**Approach**: Incremental migration with backward compatibility

---

## PHASE 1: PROJECT SETUP & CONFIGURATION (Week 1)

### 1.1 Supabase Project Creation

**Tasks**:

- [ ] Create Supabase account at https://supabase.com
- [ ] Create new project (select region closest to users)
- [ ] Note down project URL and anon key
- [ ] Set up environment variables

**Files to Create**:

```
.env
.env.example
```

**Environment Variables**:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

### 1.2 Install Dependencies

**Tasks**:

- [ ] Install Supabase client SDK
- [ ] Install required polyfills
- [ ] Install React Query for caching
- [ ] Update package.json

**Commands**:

```bash
npm install @supabase/supabase-js
npm install react-native-url-polyfill
npm install @tanstack/react-query
npm install react-native-mmkv # Better than AsyncStorage
```

**Files to Update**:

- [package.json](file:///c:/Users/amirs/OneDrive/Desktop/money%20management/main/package.json)

---

### 1.3 Supabase Client Setup

**Tasks**:

- [ ] Create Supabase client configuration
- [ ] Set up TypeScript types
- [ ] Configure storage adapter

**Files to Create**:

```
src/lib/supabase.ts
src/types/database.types.ts
```

**Implementation**:

`src/lib/supabase.ts`:

```typescript
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
```

---

### 1.4 React Query Setup

**Tasks**:

- [ ] Create QueryClient provider
- [ ] Wrap app with QueryClientProvider

**Files to Update**:

- [app/\_layout.tsx](file:///c:/Users/amirs/OneDrive/Desktop/money%20management/main/app/_layout.tsx)

**Implementation**:

```typescript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
    },
  },
});

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* existing providers */}
    </QueryClientProvider>
  );
}
```

---

## PHASE 2: DATABASE & AUTHENTICATION (Week 2)

### 2.1 Database Schema Creation

**Tasks**:

- [ ] Create database tables via Supabase SQL Editor
- [ ] Set up Row Level Security policies
- [ ] Create database functions and triggers
- [ ] Generate TypeScript types

**Files to Create**:

```
supabase/migrations/001_initial_schema.sql
supabase/migrations/002_rls_policies.sql
supabase/migrations/003_functions_triggers.sql
```

**SQL Scripts**: (Use the schema from backend_architecture.md)

**Generate Types**:

```bash
npx supabase gen types typescript --project-id your-project-id > src/types/database.types.ts
```

---

### 2.2 Authentication Migration

**Tasks**:

- [ ] Replace AuthContext with Supabase Auth
- [ ] Implement email/password authentication
- [ ] Add Google OAuth
- [ ] Add session management
- [ ] Update AuthScreen

**Files to Update**:

- [src/context/AuthContext.tsx](file:///c:/Users/amirs/OneDrive/Desktop/money%20management/main/src/context/AuthContext.tsx) → Rename to `SupabaseAuthContext.tsx`
- [src/screens/AuthScreen.tsx](file:///c:/Users/amirs/OneDrive/Desktop/money%20management/main/src/screens/AuthScreen.tsx)

**Implementation**:

`src/context/SupabaseAuthContext.tsx`:

```typescript
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });
    if (error) throw error;
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "moneyapp://auth/callback",
      },
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
```

---

### 2.3 Update Authentication Screens

**Files to Update**:

- [src/screens/AuthScreen.tsx](file:///c:/Users/amirs/OneDrive/Desktop/money%20management/main/src/screens/AuthScreen.tsx)

**Key Changes**:

```typescript
import { useAuth } from "@/context/SupabaseAuthContext";

const AuthScreen = () => {
  const { signUp, signIn, signInWithGoogle } = useAuth();

  const handleAuth = async () => {
    try {
      if (authMode === "signup") {
        await signUp(email, password, fullName);
      } else {
        await signIn(email, password);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  // ... rest of component
};
```

---

## PHASE 3: CORE FEATURES IMPLEMENTATION (Weeks 3-4)

### 3.1 Transactions Module

**Tasks**:

- [ ] Create transactions service
- [ ] Create custom hooks for CRUD operations
- [ ] Update AddTransactionScreen
- [ ] Update WalletScreen (transaction list)
- [ ] Add real-time updates

**Files to Create**:

```
src/services/transactions.service.ts
src/hooks/useTransactions.ts
src/hooks/useCreateTransaction.ts
```

**Implementation**:

`src/services/transactions.service.ts`:

```typescript
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/database.types";

type Transaction = Database["public"]["Tables"]["transactions"]["Row"];
type TransactionInsert = Database["public"]["Tables"]["transactions"]["Insert"];

export const transactionsService = {
  async getAll(userId: string, limit = 50) {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId)
      .order("transaction_date", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  async getByDateRange(userId: string, startDate: string, endDate: string) {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId)
      .gte("transaction_date", startDate)
      .lte("transaction_date", endDate)
      .order("transaction_date", { ascending: false });

    if (error) throw error;
    return data;
  },

  async create(transaction: TransactionInsert) {
    const { data, error } = await supabase
      .from("transactions")
      .insert(transaction)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<TransactionInsert>) {
    const { data, error } = await supabase
      .from("transactions")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase.from("transactions").delete().eq("id", id);

    if (error) throw error;
  },

  async getByCategory(userId: string, category: string) {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId)
      .eq("category", category)
      .order("transaction_date", { ascending: false });

    if (error) throw error;
    return data;
  },
};
```

`src/hooks/useTransactions.ts`:

```typescript
import { useQuery } from "@tanstack/react-query";
import { transactionsService } from "@/services/transactions.service";
import { useAuth } from "@/context/SupabaseAuthContext";

export const useTransactions = (limit = 50) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["transactions", user?.id, limit],
    queryFn: () => transactionsService.getAll(user!.id, limit),
    enabled: !!user,
  });
};

export const useTransactionsByDateRange = (
  startDate: string,
  endDate: string
) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["transactions", user?.id, startDate, endDate],
    queryFn: () =>
      transactionsService.getByDateRange(user!.id, startDate, endDate),
    enabled: !!user && !!startDate && !!endDate,
  });
};
```

`src/hooks/useCreateTransaction.ts`:

```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "@/services/transactions.service";
import { useAuth } from "@/context/SupabaseAuthContext";

export const useCreateTransaction = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (transaction: any) =>
      transactionsService.create({
        ...transaction,
        user_id: user!.id,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};
```

**Update AddTransactionScreen**:

```typescript
import { useCreateTransaction } from "@/hooks/useCreateTransaction";

export default function AddTransactionScreen() {
  const router = useRouter();
  const createTransaction = useCreateTransaction();

  const handleSave = async () => {
    try {
      await createTransaction.mutateAsync({
        type,
        amount: parseFloat(amount),
        category,
        transaction_date: date,
        description: note,
      });
      router.back();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  // ... rest of component
}
```

---

### 3.2 Budgets Module

**Tasks**:

- [ ] Create budgets service
- [ ] Create hooks for budgets
- [ ] Update BudgetScreen
- [ ] Add budget tracking logic

**Files to Create**:

```
src/services/budgets.service.ts
src/hooks/useBudgets.ts
src/hooks/useCreateBudget.ts
```

---

### 3.3 Goals Module

**Tasks**:

- [ ] Create goals service
- [ ] Create hooks for goals
- [ ] Update GoalScreen and AddGoalScreen
- [ ] Add contribution tracking

**Files to Create**:

```
src/services/goals.service.ts
src/hooks/useGoals.ts
src/hooks/useCreateGoal.ts
src/hooks/useAddContribution.ts
```

---

### 3.4 Subscriptions Module

**Tasks**:

- [ ] Create subscriptions service
- [ ] Create hooks for subscriptions
- [ ] Update SubscriptionsScreen
- [ ] Add subscription reminders

**Files to Create**:

```
src/services/subscriptions.service.ts
src/hooks/useSubscriptions.ts
src/hooks/useCreateSubscription.ts
```

---

## PHASE 4: ADVANCED FEATURES (Weeks 5-6)

### 4.1 Split Bill Integration

**Tasks**:

- [ ] Migrate SplitBillContext to Supabase
- [ ] Create split bill services
- [ ] Add real-time updates for groups
- [ ] Update all split bill screens

**Files to Create**:

```
src/services/splitbill.service.ts
src/hooks/useSplitGroups.ts
src/hooks/useGroupExpenses.ts
```

**Files to Update**:

- [src/context/SplitBillContext.tsx](file:///c:/Users/amirs/OneDrive/Desktop/money%20management/main/src/context/SplitBillContext.tsx) → Migrate to Supabase
- All split bill screens

---

### 4.2 Notifications System

**Tasks**:

- [ ] Create notifications service
- [ ] Add real-time notification listener
- [ ] Update NotificationsScreen
- [ ] Add push notification support (optional)

**Files to Create**:

```
src/services/notifications.service.ts
src/hooks/useNotifications.ts
src/hooks/useNotificationListener.ts
```

---

## PHASE 5: REAL-TIME & STORAGE (Week 6)

### 5.1 Real-time Subscriptions

**Tasks**:

- [ ] Add real-time listener for split bill expenses
- [ ] Add real-time listener for notifications
- [ ] Add presence tracking for groups

**Files to Create**:

```
src/hooks/useRealtimeExpenses.ts
src/hooks/useRealtimeNotifications.ts
src/hooks/usePresence.ts
```

**Implementation**:

`src/hooks/useRealtimeExpenses.ts`:

```typescript
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const useRealtimeExpenses = (groupId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel(`group-${groupId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "group_expenses",
          filter: `group_id=eq.${groupId}`,
        },
        () => {
          queryClient.invalidateQueries({
            queryKey: ["group-expenses", groupId],
          });
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [groupId, queryClient]);
};
```

---

### 5.2 File Storage

**Tasks**:

- [ ] Set up storage buckets
- [ ] Create storage policies
- [ ] Implement file upload for receipts
- [ ] Implement file upload for statements
- [ ] Update UploadStatementScreen

**Files to Create**:

```
src/services/storage.service.ts
src/hooks/useUploadFile.ts
```

**Implementation**:

`src/services/storage.service.ts`:

```typescript
import { supabase } from "@/lib/supabase";

export const storageService = {
  async uploadReceipt(userId: string, file: File) {
    const fileName = `${Date.now()}_${file.name}`;
    const filePath = `${userId}/${fileName}`;

    const { data, error } = await supabase.storage
      .from("receipts")
      .upload(filePath, file);

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from("receipts").getPublicUrl(filePath);

    return { path: filePath, url: publicUrl };
  },

  async uploadStatement(userId: string, file: File) {
    const fileName = `${Date.now()}_${file.name}`;
    const filePath = `${userId}/${fileName}`;

    const { data, error } = await supabase.storage
      .from("statements")
      .upload(filePath, file);

    if (error) throw error;
    return { path: filePath };
  },

  async deleteFile(bucket: string, path: string) {
    const { error } = await supabase.storage.from(bucket).remove([path]);

    if (error) throw error;
  },
};
```

---

## PHASE 6: TESTING & DEPLOYMENT (Weeks 7-8)

### 6.1 Testing

**Tasks**:

- [ ] Write unit tests for services
- [ ] Write integration tests for hooks
- [ ] Test authentication flow
- [ ] Test CRUD operations
- [ ] Test real-time updates
- [ ] Test file uploads

**Files to Create**:

```
src/__tests__/services/transactions.test.ts
src/__tests__/hooks/useTransactions.test.ts
```

---

### 6.2 Error Handling & Loading States

**Tasks**:

- [ ] Add error boundaries
- [ ] Add loading skeletons
- [ ] Add retry logic
- [ ] Add offline support

**Files to Create**:

```
src/components/common/ErrorBoundary.tsx
src/components/common/LoadingSkeleton.tsx
```

---

### 6.3 Deployment

**Tasks**:

- [ ] Configure Supabase production settings
- [ ] Set up environment variables for production
- [ ] Deploy database migrations
- [ ] Set up monitoring
- [ ] Configure backups

---

## FILE STRUCTURE SUMMARY

```
src/
├── lib/
│   └── supabase.ts                    # Supabase client
├── types/
│   └── database.types.ts              # Auto-generated types
├── services/
│   ├── transactions.service.ts
│   ├── budgets.service.ts
│   ├── goals.service.ts
│   ├── subscriptions.service.ts
│   ├── splitbill.service.ts
│   ├── notifications.service.ts
│   └── storage.service.ts
├── hooks/
│   ├── useTransactions.ts
│   ├── useCreateTransaction.ts
│   ├── useBudgets.ts
│   ├── useGoals.ts
│   ├── useSubscriptions.ts
│   ├── useSplitGroups.ts
│   ├── useNotifications.ts
│   ├── useRealtimeExpenses.ts
│   ├── useUploadFile.ts
│   └── usePresence.ts
├── context/
│   └── SupabaseAuthContext.tsx        # Replaces AuthContext
└── screens/
    └── (all existing screens updated)

supabase/
├── migrations/
│   ├── 001_initial_schema.sql
│   ├── 002_rls_policies.sql
│   └── 003_functions_triggers.sql
└── functions/
    ├── parse-statement/
    └── subscription-reminders/
```

---

## VERIFICATION CHECKLIST

### Phase 1 ✓

- [ ] Supabase project created
- [ ] Dependencies installed
- [ ] Environment variables configured
- [ ] Supabase client initialized

### Phase 2 ✓

- [ ] Database schema created
- [ ] RLS policies enabled
- [ ] Authentication working
- [ ] User can sign up/sign in

### Phase 3 ✓

- [ ] Transactions CRUD working
- [ ] Budgets CRUD working
- [ ] Goals CRUD working
- [ ] Subscriptions CRUD working

### Phase 4 ✓

- [ ] Split bill groups working
- [ ] Notifications working
- [ ] Real-time updates working

### Phase 5 ✓

- [ ] File uploads working
- [ ] Storage policies working

### Phase 6 ✓

- [ ] All tests passing
- [ ] Error handling complete
- [ ] Production deployment successful

---

## NEXT STEPS

1. **Review this plan** and confirm approach
2. **Start with Phase 1** - Project setup
3. **Proceed incrementally** through each phase
4. **Test thoroughly** after each phase

Ready to begin implementation?
