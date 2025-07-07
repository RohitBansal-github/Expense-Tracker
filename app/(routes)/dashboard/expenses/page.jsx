"use client";

import React, { useEffect, useState, useCallback } from "react";
import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useAuth } from "@clerk/nextjs";
import ExpenseListTable from "./_components/ExpenseListTable";
import SideNav from "@/app/(routes)/dashboard/_components/SideNav";
import DashboardHeader from "@/app/(routes)/dashboard/_components/DashboardHeader";

export default function ExpensesPage() {
  const { userId } = useAuth();                     // 🔑 current user
  const [expensesList, setExpensesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  // 🔒 fetch only current user's expenses
  const fetchExpenses = useCallback(async () => {
    if (!userId) return;
    setLoading(true);

    const result = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.createdBy, userId));

    setExpensesList(result);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* ===== Sidebar ===== */}
      <div
        className={`fixed top-0 left-0 h-screen md:w-64 w-full bg-white border shadow-sm z-20
          transition-transform duration-300 ${showSidebar ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <SideNav />
      </div>

      {/* Overlay (mobile) */}
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

        {/* Page content */}
        <div className="w-full p-5">
          <h2 className="font-bold mb-3 text-3xl">My Expenses</h2>
          <ExpenseListTable
            expensesList={expensesList}
            refreshData={fetchExpenses}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
