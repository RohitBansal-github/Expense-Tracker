import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Trash } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

function ExpenseListTable({ expensesList, refreshData }) {
  const deleteExpenses = async (expenses) => {
    const result = await db
      .delete(Expenses)
      .where(eq(Expenses.id, expenses.id))
      .returning();

    if (result) {
      refreshData?.();
      toast('Expense Deleted!');
    }
  };

  return (
    <div className="mt-5 w-full px-2 sm:px-4 md:px-0">
      <h2 className="font-bold text-lg sm:text-xl mb-4">Latest Expenses</h2>

      {/* Table Container */}
      <div className="overflow-x-auto" role="table" aria-label="Expenses Table">
        {/* Table Header */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm md:text-base font-semibold bg-slate-200 p-2 sm:p-3 rounded-t-lg">
          <div className="text-left min-w-[80px] sm:min-w-[100px] truncate">Name</div>
          <div className="text-left min-w-[60px] sm:min-w-[80px] truncate">Amount</div>
          <div className="text-left min-w-[80px] sm:min-w-[100px] truncate">Date</div>
          <div className="text-center min-w-[40px] sm:min-w-[60px]">Action</div>
        </div>

        {/* Table Body */}
        <div className="flex flex-col gap-2 sm:gap-3 w-full mt-1">
          {expensesList.map((expenses) => (
            <div
              key={expenses.id}
              className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 items-center bg-slate-100 p-2 sm:p-3 rounded-lg shadow-sm border hover:bg-slate-50 transition"
              role="row"
            >
              <div className="text-xs sm:text-sm md:text-base min-w-[80px] sm:min-w-[100px] truncate" role="cell">
                {expenses.name}
              </div>
              <div
                className="text-xs sm:text-sm md:text-base text-green-600 min-w-[60px] sm:min-w-[80px] truncate"
                role="cell"
              >
                ₹ {expenses.amount}
              </div>
              <div
                className="text-xs sm:text-sm md:text-base text-gray-500 min-w-[80px] sm:min-w-[100px] truncate"
                role="cell"
              >
                {expenses.createdAt}
              </div>
              <div className="flex justify-center min-w-[40px] sm:min-w-[60px]" role="cell">
                <Trash
                  className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 cursor-pointer hover:scale-110 transition"
                  onClick={() => deleteExpenses(expenses)}
                  aria-label={`Delete expense ${expenses.name}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExpenseListTable;