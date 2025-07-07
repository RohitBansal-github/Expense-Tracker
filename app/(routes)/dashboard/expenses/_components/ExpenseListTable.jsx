"use client";

import { db } from "@/utils/dbConfig";
import { Expenses, Budgets } from "@/utils/schema";
import { and, eq } from "drizzle-orm";
import { useAuth } from "@clerk/nextjs";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import React from "react";

function ExpenseListTable({ expensesList, refreshData, loading }) {
  const { userId } = useAuth();

  const deleteExpense = async (expense) => {
    if (!userId) return;

    try {
      await db
        .delete(Expenses)
        .where(
          and(
            eq(Expenses.id, expense.id),
            eq(Expenses.createdBy, userId)  // 🔐 User isolation
          )
        );

      toast.success("Expense deleted!");
      refreshData();
    } catch (err) {
      console.error(err);
      toast.error("Error deleting expense.");
    }
  };


  if (loading) return <p className="text-sm text-gray-500">Loading…</p>;

  return (
    <div className="mt-5 w-full px-2 sm:px-4 md:px-0">
      <h2 className="font-bold text-lg sm:text-xl mb-4">Latest Expenses</h2>

      <div className="overflow-x-auto">
        <div className="grid grid-cols-4 gap-2 sm:gap-3 font-semibold bg-slate-200 p-3 rounded-t-lg">
          <div>Name</div>
          <div>Amount</div>
          <div>Date</div>
          <div className="text-center">Action</div>
        </div>

        {expensesList.map((e) => (
          <div
            key={e.id}
            className="grid grid-cols-4 gap-2 sm:gap-3 items-center bg-slate-100 p-3 rounded-lg shadow-sm border hover:bg-slate-50"
          >
            <div>{e.name}</div>
            <div className="text-green-600">₹ {e.amount}</div>
            <div className="text-gray-500">{e.createdAt}</div>
            <div className="flex justify-center">
              <Trash
                className="w-4 h-4 text-red-600 cursor-pointer hover:scale-110"
                onClick={() => deleteExpense(e)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseListTable;
