# Supabase Setup

1. Create a Supabase project and copy the project URL, anon key, and service role key.
2. Add values to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

3. Run `supabase/migrations/202604260001_initial_schema.sql`.
4. Confirm seed rows exist in `services` and `pricing_plans`.
5. Enable email/password auth for admin users.

The migration also creates `public.get_current_user_role()`, updated-at triggers, profile creation on auth signup, and booking status event logging.

RLS keeps customers scoped to their own data. Staff roles are `admin`, `dispatcher`, and `technician`.
