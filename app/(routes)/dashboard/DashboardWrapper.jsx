'use client';

import { useUser, RedirectToSignIn } from '@clerk/nextjs';
import DashboardLayout from './DashboardLayout';

export default function DashboardWrapper({ children }) {
  const { isLoaded, isSignedIn } = useUser();

  // 1. Wait until Clerk finishes loading
  if (!isLoaded) return null;             // ya koi loader show kar lo

  // 2. Not signed‑in ⇒ send to Clerk sign‑in,
  //    and come back to /dashboard after success
  if (!isSignedIn) {
    return <RedirectToSignIn redirectUrl="/dashboard" />;
  }

  // 3. Signed‑in ⇒ render dashboard with sidebar/layout
  return <DashboardLayout>{children}</DashboardLayout>;
}
