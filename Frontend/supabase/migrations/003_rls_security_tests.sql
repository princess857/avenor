cd-- Avenor International Hospital - RLS Security Tests
-- Migration: 003_rls_security_tests.sql
--
-- These tests verify authorized and unauthorized access patterns.
-- Run each block as the appropriate authenticated role using
-- `SET ROLE` or by setting `auth.uid()` / `auth.jwt()` via the
-- Supabase client in tests.
--
-- NOTE: Supabase RLS is evaluated against auth.uid() and auth.jwt(),
-- which are set by the client library after sign-in. These SQL snippets
-- are reference checks to be adapted into an automated test suite.

-- ------------------------------------------------------------------
-- Test setup helper (conceptual): set a fake auth uid for testing
-- In real tests, use the Supabase client to sign in as each role.
-- ------------------------------------------------------------------
-- SET local request.jwt.claims = '{"sub": "00000000-0000-0000-0000-000000000001", "role": "super_administrator"}';
-- SET local auth.uid = '00000000-0000-0000-0000-000000000001';

-- ------------------------------------------------------------------
-- Test A: Super admin can read all profiles (AUTHORIZED)
-- ------------------------------------------------------------------
-- SELECT count(*) FROM public.profiles;
-- EXPECT: success, returns all rows

-- ------------------------------------------------------------------
-- Test B: Receptionist cannot read profiles of other staff (UNAUTHORIZED)
-- ------------------------------------------------------------------
-- SELECT * FROM public.profiles WHERE id <> auth.uid();
-- EXPECT: 0 rows returned (RLS blocks)

-- ------------------------------------------------------------------
-- Test C: Receptionist can manage appointments (AUTHORIZED)
-- ------------------------------------------------------------------
-- INSERT INTO public.appointments (patient_id, doctor_id, appointment_date, appointment_time)
-- VALUES (...);
-- EXPECT: success

-- ------------------------------------------------------------------
-- Test D: Receptionist cannot manage invoices (UNAUTHORIZED)
-- ------------------------------------------------------------------
-- SELECT * FROM public.invoices;
-- EXPECT: 0 rows returned (RLS blocks - invoices restricted to admins/accountants + patient's own)

-- ------------------------------------------------------------------
-- Test E: Accountant can manage invoices (AUTHORIZED)
-- ------------------------------------------------------------------
-- SELECT * FROM public.invoices;
-- EXPECT: success, returns all rows

-- ------------------------------------------------------------------
-- Test F: Accountant cannot manage staff (UNAUTHORIZED)
-- ------------------------------------------------------------------
-- SELECT * FROM public.staff;
-- EXPECT: 0 rows returned (RLS blocks - staff restricted to admins)

-- ------------------------------------------------------------------
-- Test G: Doctor can view their own appointments (AUTHORIZED)
-- ------------------------------------------------------------------
-- SELECT * FROM public.appointments WHERE doctor_id = (SELECT id FROM public.doctors WHERE profile_id = auth.uid());
-- EXPECT: success, returns only that doctor's appointments

-- ------------------------------------------------------------------
-- Test H: Doctor cannot view other doctors' appointments (UNAUTHORIZED)
-- ------------------------------------------------------------------
-- SELECT * FROM public.appointments WHERE doctor_id <> (SELECT id FROM public.doctors WHERE profile_id = auth.uid());
-- EXPECT: 0 rows returned (RLS blocks)

-- ------------------------------------------------------------------
-- Test I: Patient can view their own appointments (AUTHORIZED)
-- ------------------------------------------------------------------
-- SELECT * FROM public.appointments
-- WHERE patient_id = (SELECT id FROM public.patients WHERE profile_id = auth.uid());
-- EXPECT: success, returns only that patient's appointments

-- ------------------------------------------------------------------
-- Test J: Patient cannot view other patients' records (UNAUTHORIZED)
-- ------------------------------------------------------------------
-- SELECT * FROM public.patients WHERE profile_id <> auth.uid();
-- EXPECT: 0 rows returned

-- ------------------------------------------------------------------
-- Test K: Unauthenticated user cannot read any table (UNAUTHORIZED)
-- ------------------------------------------------------------------
-- (No auth.uid() set)
-- SELECT * public.profiles;
-- EXPECT: error or 0 rows (RLS requires auth.uid() IS NOT NULL for most tables)

-- ------------------------------------------------------------------
-- Test L: Users can update their own notifications read flag (AUTHORIZED)
-- ------------------------------------------------------------------
-- UPDATE public.notifications SET read = true WHERE id = ... AND user_id = auth.uid();
-- EXPECT: success

-- ------------------------------------------------------------------
-- Test M: Users cannot update other users' notifications (UNAUTHORIZED)
-- ------------------------------------------------------------------
-- UPDATE public.notifications SET read = true WHERE id = ... AND user_id <> auth.uid();
-- EXPECT: 0 rows affected

-- ------------------------------------------------------------------
-- Test N: Only admins can manage site_content (AUTHORIZED for admins, UNAUTHORIZED for others)
-- ------------------------------------------------------------------
-- SELECT * FROM public.site_content; -- as receptionist -> 0 rows? Actually SELECT is open to all authenticated
-- UPDATE public.site_content SET value = '...'; -- as non-admin -> 0 rows affected

-- ------------------------------------------------------------------
-- End of security tests
-- ------------------------------------------------------------------
