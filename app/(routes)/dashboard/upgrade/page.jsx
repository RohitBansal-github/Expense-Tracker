'use client';

import { ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import SideNav from '@/app/(routes)/dashboard/_components/SideNav';
import DashboardHeader from '@/app/(routes)/dashboard/_components/DashboardHeader';

export default function Upgrade() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-indigo-50 to-white">

      {/* === Sidebar === */}
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

      {/* === Main Content === */}
      <div className="transition-all md:ml-64">
        {/* Hamburger for mobile */}
        <button
          className="md:hidden fixed top-4 left-4 z-30 p-3 rounded-md bg-white shadow"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <svg width="24" height="24" stroke="currentColor" fill="none" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>

        {/* Optional dashboard header */}
        <DashboardHeader />

        {/* Upgrade promo block */}
        <div className="flex items-center justify-center p-4">
          <div className="text-center max-w-lg mt-10">
            <ShieldCheck className="w-12 h-12 text-indigo-600 mx-auto mb-4" />

            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              Unlock Your Financial Potential Today!
            </h1>

            <p className="text-lg text-gray-600 mb-6">
              Upgrade to Premium and enjoy: <br />
              ✨ Advanced Analytics <br />
              📊 Unlimited Transaction Tracking <br />
              💡 Exclusive Financial Insights
            </p>

            <a
              href="#"
              className="inline-block bg-gradient-to-r from-indigo-700 to-indigo-400 text-white px-8 py-3 rounded-lg font-semibold hover:from-indigo-400 hover:to-indigo-700 transition-all hover:scale-105 active:scale-95"
            >
              Upgrade Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
