"use client";

import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { eq, getTableColumns, sql, count, desc } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import BudgetItem from '../../budgets/_components/BudgetItem';
import AddExpense from '../_components/AddExpense';
import ExpenseListTable from '../_components/ExpenseListTable';
import { Button } from '@/components/ui/button';
import { PenBox, Trash } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import EditBudget from '../_components/EditBudget';

function ExpensesScreen({ params }) {
  const { user } = useUser();
  const budgetId = params.id;
  const router = useRouter();

  const [budgetInfo, setBudgetInfo] = useState();
  const [expensesList, setExpensesList] = useState([]);

  useEffect(() => {
    if (user) {
      getBudgetInfo();
    }
  }, [user, budgetId]); // Ensure data is refetched when user or budgetId changes

  const getBudgetInfo = async () => {
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend: sql`sum(CAST(${Expenses.amount} AS NUMERIC))`.as('totalSpend'),
      totalItem: count(Expenses.id).as('totalItem'),
    })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(Budgets.id, budgetId))
      .groupBy(Budgets.id);

    setBudgetInfo(result[0]);
    getExpensesList(); // Fetch expenses after getting budget info
  };

  const getExpensesList = async () => {
    const result = await db.select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, budgetId))
      .orderBy(desc(Expenses.id));



    setExpensesList(result); // Update expenses state
  };

  const deleteBudget = async () => {
    await db.delete(Expenses)
      .where(eq(Expenses.budgetId, budgetId))
      .returning();

    await db.delete(Budgets)
      .where(eq(Budgets.id, budgetId))
      .returning();

    toast('Budget Deleted!');
    router.replace('/dashboard/budgets'); // Navigate after deletion
  };

  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold flex justify-between items-center'>
        My Expenses

        <div className='flex gap-2 items-center'>
          {budgetInfo && <EditBudget budgetInfo={budgetInfo} refreshData={getBudgetInfo} />}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="flex gap-2 cursor-pointer" variant="destructive">
                <Trash /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete your budget and all associated expenses.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                <AlertDialogAction className="cursor-pointer" onClick={deleteBudget}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>
        {budgetInfo
          ? <BudgetItem budget={budgetInfo} />
          : <div className='h-[145px] w-full bg-slate-200 rounded-lg animate-pulse'></div>
        }

        <AddExpense
          budgetId={budgetId}
          user={user}
          refreshData={getBudgetInfo}
        />
      </div>

      <div className='mt-4'>
      <ExpenseListTable expensesList={expensesList} refreshData={getBudgetInfo} />

      </div>
    </div>
  );
}

export default ExpensesScreen;
