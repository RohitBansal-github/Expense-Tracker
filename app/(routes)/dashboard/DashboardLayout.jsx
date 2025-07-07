'use client';

import React, { useState, useEffect } from 'react';
import SideNav from './_components/SideNav';
import DashboardHeader from './_components/DashboardHeader';
import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

function DashboardLayout({ children }) {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (user === null) {
      router.replace('/');
      return;
    }
    if (user) checkUserBudgets();
  }, [user]);

  const checkUserBudgets = async () => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(Budgets)
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));

      // if (result?.length === 0) {
      //   router.replace('/dashboard/budgets');
      // }
    } catch (error) {
      console.error('Error fetching budgets:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div className="relative min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen md:w-64 w-full bg-white border shadow-sm z-20 transition-transform duration-300 ease-in-out
          ${showSidebar ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0`}
      >
        <SideNav />
      </div>

      {/* Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-10 md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Content */}
      <div className={`transition-all md:ml-64`}>
        <button
          className="md:hidden fixed top-4 left-4 z-30 p-3 rounded-md bg-white shadow-md"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>

        <DashboardHeader />
        <div>{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
