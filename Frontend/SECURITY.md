# Avenor International Hospital — Security Documentation

## 1. Authentication

### Admin login
- Route: `/admin/login`
- Demo credentials (no Supabase configured): `admin@avenorhospital.com` / `admin123`
- With Supabase configured: email/password via `supabase.auth.signInWithPassword`
- Session persisted in browser (Supabase client manages `access_token`/`refresh_token`)
- Demo mode: token stored in `localStorage` under `avenor-admin-token`

### Logout
- Calls `supabase.auth.signOut()` (or clears demo token in demo mode)
- Redirects to `/admin/login`

### Password reset
- With Supabase: `supabase.auth.resetPasswordForEmail(email)` with redirect to `/admin/reset-password`
- Demo mode: not supported (returns error)

### Session restoration
- On mount, `useSupabaseAuth` calls `supabase.auth.getSession()` and listens to `onAuthStateChange`
- Demo mode restores from `localStorage`

### Protected routes
- All `/admin/*` routes (except `/admin/login`) are wrapped in `ProtectedRoute`
- `ProtectedRoute` waits for `loading` to complete before redirecting (avoids flashing during session restore)
- Unauthenticated users are redirected to `/admin/login`
- Role-based route gating via `allowedRoles` prop

## 2. Role-Based Access Control (RBAC)

### Roles
| Role | Description |
|------|-------------|
| `super_administrator` | Full access to all admin features |
| `hospital_administrator` | Broad access (all except super-admin-only) |
| `doctor` | Appointments, own patients, own schedule |
| `receptionist` | Appointments management only |
| `accountant` | Invoices, payments, analytics |
| `staff` | Read-only access to most directories |

### Enforcement layers
1. **Route level** — `ProtectedRoute` with `allowedRoles` in `src/App.jsx`
2. **Component level** — `RequireRole` component in `src/admin/components/RequireRole.jsx`
3. **Database level** — Row Level Security (RLS) policies on all 13 tables (see `supabase/migrations/002_rls_policies.sql`)

> Database-level enforcement is the source of truth. Frontend role hiding is UX only; RLS prevents unauthorized data access even if frontend controls are bypassed.

### Role-based route restrictions (App.jsx)
- `admin/doctors`, `admin/departments`, `admin/staff`, `admin/website` → super_administrator / hospital_administrator only
- `admin/services`, `admin/billing`, `admin/analytics` → super / hospital admin / accountant
- `admin/appointments`, `admin/patients` → all authenticated staff roles
- `admin/notifications`, `admin/settings` → all authenticated

## 3. Database Security

### Row Level Security (RLS)
RLS is enabled on all 13 tables. Policies are defined in `supabase/migrations/002_rls_policies.sql`.

Key principles:
- Users read their own profile (`auth.uid() = id`)
- Admins (`super_administrator`, `hospital_administrator`) can manage most tables
- Receptionists manage appointments only
- Accountants manage invoices/payments only
- Doctors manage their own schedules and update appointments they own
- Patients view their own appointments/invoices
- `activity_logs` and `notifications` allow system inserts (`WITH CHECK (true)`)
- Unauthenticated users are blocked from all tables

### Tables (13)
`profiles`, `departments`, `doctors`, `patients`, `appointments`, `doctor_schedules`, `staff`, `services`, `invoices`, `payments`, `notifications`, `site_content`, `activity_logs`

All tables use UUID primary keys, `created_at`/`updated_at` timestamps, foreign keys, indexes, and check constraints.

### Security tests
Reference SQL tests in `supabase/migrations/003_rls_security_tests.sql` covering authorized and unauthorized access for each role.

## 4. Secrets Management

### Environment variables
- `.env.example` — placeholder values (do not commit real keys)
- `.env` — actual values, EXCLUDED from git via `.gitignore`
- Only `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are exposed to the frontend
- **Never** place `service_role` or `secret` key in frontend code

### `.gitignore` exclusions
```
.env
.env.local
.env.*.local
```

## 5. What Still Requires Manual Configuration

1. **Create a Supabase project** at supabase.io
2. **Copy `.env.example` to `.env`** and fill in:
   - `VITE_SUPABASE_URL` — from Project Settings → API → Project URL
   - `VITE_SUPABASE_ANON_KEY` — from Project Settings → API → Project API Keys → anon public
3. **Run migrations** in the Supabase SQL Editor:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_rls_policies.sql`
4. **Enable email auth** in Supabase Authentication settings (for password reset)
5. **Configure URL redirect** for password reset to `/admin/reset-password`
6. **Create the first super admin user** via Supabase Auth, then insert a matching row into `public.profiles` with `role = 'super_administrator'`
7. **Enable Realtime** in Supabase for tables needing live updates (appointments, notifications)
8. **Create a `/admin/reset-password` route** to handle the password reset redirect

## 6. Production Readiness Checklist

- [ ] Supabase project created and `.env` configured
- [ ] All 13 migrations applied
- [ ] RLS policies enabled and tested
- [ ] First super admin user created in `auth.users` + `public.profiles`
- [ ] Email auth + password reset configured
- [ ] Realtime enabled for required tables
- [ ] No `service_role` key in frontend code or git
- [ ] `.env` excluded from version control
- [ ] Build passes (`npm run build`)
- [ ] Lint passes (`npm run lint`)
- [ ] Public website unchanged and functional

## 7. Compliance Notice

Using Supabase does **not** by itself confer HIPAA, GDPR, or other healthcare regulatory compliance. A formal legal, privacy, and security review is required before storing real patient data.
