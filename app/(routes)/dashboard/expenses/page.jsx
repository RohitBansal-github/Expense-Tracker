"use client"

import React, { useEffect, useState } from 'react';
import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema';
import { eq } from 'drizzle-orm';

import { toast } from 'sonner';
import ExpenseListTable from './_components/ExpenseListTable';

function ExpensesPage() {
  const [expensesList, setExpensesList] = useState([]);

  const fetchExpenses = async () => {
    const result = await db.select().from(Expenses);
    setExpensesList(result);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const refreshData = async () => {
    await fetchExpenses();
  };

  return (
    <div className="w-full p-5">
        <h2 className='font-bold mb-3 text-3xl'>My Expenses</h2>
      <ExpenseListTable expensesList={expensesList} refreshData={refreshData} />
    </div>
  );
}

export default ExpensesPage;
