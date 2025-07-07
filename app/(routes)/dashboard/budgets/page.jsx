'use client';

import React, { useState } from 'react';
import BudgetList from './_components/BudgetList';
import SideNav from '@/app/(routes)/dashboard/_components/SideNav';
import DashboardHeader from '@/app/(routes)/dashboard/_components/DashboardHeader';

export default function Budget() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="relative min-h-screen bg-gray-50">

      {/* ===== Sidebar ===== */}
      <div
        className={`fixed top-0 left-0 h-screen md:w-64 w-full bg-white border shadow-sm z-20
          transition-transform duration-300 ${showSidebar ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <SideNav />
      </div>

      {/* Overlay for mobile */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/40 z-10 md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* ===== Main Content ===== */}
      <div className="transition-all md:ml-64">
        {/* Hamburger button (mobile) */}
        <button
          className="md:hidden fixed top-4 left-4 z-30 p-3 rounded-md bg-white shadow"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <svg width="24" height="24" stroke="currentColor" fill="none" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>

        <DashboardHeader />

        {/* Page‑specific content */}
        <div className="p-10">
          <h2 className="font-bold text-3xl mb-4">My Budgets</h2>
          <BudgetList />
        </div>
      </div>
    </div>
  );
}
