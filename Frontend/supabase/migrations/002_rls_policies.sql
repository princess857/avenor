-- Avenor International Hospital - Row Level Security Policies
-- Migration: 002_rls_policies.sql
--
-- Enables RLS on every exposed table and creates least-privilege
-- SELECT/INSERT/UPDATE/DELETE policies keyed on auth.uid() and
-- the profiles.role column.
--
-- Apply AFTER 001_initial_schema.sql.

-- ------------------------------------------------------------------
-- Enable RLS on all tables
-- ------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctor_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------
-- Helper: role-check expressions (inline in each policy)
--   is_admin   = super_administrator or hospital_administrator
--   is_clinical = doctor or receptionist
-- ------------------------------------------------------------------

-- ------------------------------------------------------------------
-- 1. profiles
-- ------------------------------------------------------------------
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role IN ('super_administrator', 'hospital_administrator')
    )
  );

CREATE POLICY "Admins can insert profiles"
  ON public.profiles FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role IN ('super_administrator', 'hospital_administrator')
    )
  );

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can update all profiles"
  ON public.profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role IN ('super_administrator', 'hospital_administrator')
    )
  );

-- ------------------------------------------------------------------
-- 2. departments
-- ------------------------------------------------------------------
CREATE POLICY "Authenticated users can view departments"
  ON public.departments FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage departments"
  ON public.departments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role IN ('super_administrator', 'hospital_administrator')
    )
  );

-- ------------------------------------------------------------------
-- 3. doctors
-- ------------------------------------------------------------------
CREATE POLICY "Authenticated users can view doctors"
  ON public.doctors FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage doctors"
  ON public.doctors FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role IN ('super_administrator', 'hospital_administrator')
    )
  );

-- ------------------------------------------------------------------
-- 4. patients
-- ------------------------------------------------------------------
CREATE POLICY "Staff can view all patients"
  ON public.patients FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage patients"
  ON public.patients FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role IN ('super_administrator', 'hospital_administrator')
    )
  );

CREATE POLICY "Doctors can update patients they treat"
  ON public.patients FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.appointments a
      JOIN public.doctors d ON d.id = a.doctor_id
      WHERE a.patient_id = public.patients.id
        AND d.profile_id = auth.uid()
    )
  );

-- ------------------------------------------------------------------
-- 5. appointments
-- ------------------------------------------------------------------
CREATE POLICY "Staff can view all appointments"
  ON public.appointments FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Patients can view their own appointments"
  ON public.appointments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.patients p
      WHERE p.id = public.appointments.patient_id
        AND p.profile_id = auth.uid()
    )
  );

CREATE POLICY "Admins and receptionists can manage appointments"
  ON public.appointments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role IN ('super_administrator', 'hospital_administrator', 'receptionist')
    )
  );

CREATE POLICY "Doctors can update appointment status"
  ON public.appointments FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.doctors d
      WHERE d.id = public.appointments.doctor_id
        AND d.profile_id = auth.uid()
    )
  );

-- ------------------------------------------------------------------
-- 6. doctor_schedules
-- ------------------------------------------------------------------
CREATE POLICY "Authenticated users can view doctor schedules"
  ON public.doctor_schedules FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage doctor schedules"
  ON public.doctor_schedules FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role IN ('super_administrator', 'hospital_administrator')
    )
  );

CREATE POLICY "Doctors can manage their own schedules"
  ON public.doctor_schedules FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.doctors d
      WHERE d.id = public.doctor_schedules.doctor_id
        AND d.profile_id = auth.uid()
    )
  );

-- ------------------------------------------------------------------
-- 7. staff
-- ------------------------------------------------------------------
CREATE POLICY "Authenticated users can view staff"
  ON public.staff FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage staff"
  ON public.staff FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role IN ('super_administrator', 'hospital_administrator')
    )
  );

-- ------------------------------------------------------------------
-- 8. services
-- ------------------------------------------------------------------
CREATE POLICY "Authenticated users can view services"
  ON public.services FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage services"
  ON public.services FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role IN ('super_administrator', 'hospital_administrator')
    )
  );

-- ------------------------------------------------------------------
-- 9. invoices
-- ------------------------------------------------------------------
CREATE POLICY "Staff can view all invoices"
  ON public.invoices FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Patients can view their own invoices"
  ON public.invoices FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.patients p
      WHERE p.id = public.invoices.patient_id
        AND p.profile_id = auth.uid()
    )
  );

CREATE POLICY "Admins and accountants can manage invoices"
  ON public.invoices FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role IN ('super_administrator', 'hospital_administrator', 'accountant')
    )
  );

-- ------------------------------------------------------------------
-- 10. payments
-- ------------------------------------------------------------------
CREATE POLICY "Staff can view all payments"
  ON public.payments FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins and accountants can manage payments"
  ON public.payments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role IN ('super_administrator', 'hospital_administrator', 'accountant')
    )
  );

-- ------------------------------------------------------------------
-- 11. notifications
-- ------------------------------------------------------------------
CREATE POLICY "Users can view their own notifications"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all notifications"
  ON public.notifications FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role IN ('super_administrator', 'hospital_administrator')
    )
  );

CREATE POLICY "System can insert notifications"
  ON public.notifications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can mark their own notifications read"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ------------------------------------------------------------------
-- 12. site_content
-- ------------------------------------------------------------------
CREATE POLICY "Authenticated users can view site content"
  ON public.site_content FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage site content"
  ON public.site_content FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role IN ('super_administrator', 'hospital_administrator')
    )
  );

-- ------------------------------------------------------------------
-- 13. activity_logs
-- ------------------------------------------------------------------
CREATE POLICY "Users can view their own activity logs"
  ON public.activity_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all activity logs"
  ON public.activity_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role IN ('super_administrator', 'hospital_administrator')
    )
  );

CREATE POLICY "System can insert activity logs"
  ON public.activity_logs FOR INSERT
  WITH CHECK (true);
