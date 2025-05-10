// app/(routes)/dashboard/DashboardWrapper.js
"use client";

import { useUser } from "@clerk/nextjs";
import DashboardLayout from "./DashboardLayout";

export default function DashboardWrapper({ children }) {
  const { isSignedIn } = useUser();

  if (!isSignedIn) return <>{children}</>; // Show content only when not signed in

  return <DashboardLayout>{children}</DashboardLayout>; // Show layout with sidebar if signed in
}
