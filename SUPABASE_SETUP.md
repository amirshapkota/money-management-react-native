# Supabase Setup Instructions

## 🚀 Quick Start Guide

### Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Name**: Money Management App
   - **Database Password**: (choose a strong password)
   - **Region**: Select closest to your users
5. Click "Create new project"
6. Wait for project to be created (~2 minutes)

### Step 2: Get Your Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

### Step 3: Update Environment Variables

1. Open `.env` file in your project root
2. Replace the placeholder values:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-actual-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

### Step 4: Create Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the SQL from `supabase/migrations/001_initial_schema.sql`
4. Click "Run" to execute
5. Repeat for `002_rls_policies.sql` and `003_functions_triggers.sql`

### Step 5: Set Up Authentication

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Enable **Email** provider (enabled by default)
3. For Google OAuth:
   - Enable **Google** provider
   - Add your Google OAuth credentials
   - Add redirect URL: `moneyapp://auth/callback`

### Step 6: Set Up Storage

1. Go to **Storage** in Supabase dashboard
2. Create three buckets:
   - `avatars` (public)
   - `receipts` (private)
   - `statements` (private)
3. Set up storage policies (see `supabase/storage-policies.sql`)

### Step 7: Test Connection

1. Restart your Expo development server:
   ```bash
   npm start
   ```
2. The app should now connect to Supabase
3. Try signing up a new user to test authentication

---

## 📁 File Structure Created

```
.env                          # Your credentials (DO NOT COMMIT)
.env.example                  # Template for other developers
src/
├── lib/
│   └── supabase.ts          # Supabase client configuration
└── types/
    └── database.types.ts    # TypeScript types for database
```

---

## ✅ Verification Checklist

- [ ] Supabase project created
- [ ] Environment variables updated in `.env`
- [ ] Database schema created (all 3 migration files)
- [ ] RLS policies enabled
- [ ] Email authentication enabled
- [ ] Storage buckets created
- [ ] App connects to Supabase successfully

---

## 🔒 Security Notes

- **NEVER** commit `.env` file to git
- The `.env` file is already in `.gitignore`
- Only share the anon/public key (it's safe for client-side use)
- Keep your service role key secret (we'll use it later for Edge Functions)

---

## 🆘 Troubleshooting

**Error: "Supabase URL or Anon Key is missing"**

- Check that `.env` file exists
- Verify environment variables are set correctly
- Restart Expo development server

**Error: "Invalid API key"**

- Double-check you copied the correct anon key
- Make sure there are no extra spaces

**Database connection failed**

- Verify database schema is created
- Check RLS policies are enabled
- Ensure your IP is not blocked

---

## 📚 Next Steps

Once setup is complete, we'll proceed to:

1. Implement Supabase Auth context
2. Create data services for transactions, budgets, etc.
3. Add real-time subscriptions
4. Implement file uploads

Need help? Check the [Supabase Documentation](https://supabase.com/docs)
