"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import CardInfo from './_components/CardInfo';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { count, desc, eq, getTableColumns, sql } from 'drizzle-orm';
import BarChartDashboard from './budgets/_components/BarChartDashboard';
import BudgetItem from './budgets/_components/BudgetItem';
import ExpenseListTable from './expenses/_components/ExpenseListTable';
import DashboardWrapper from './DashboardWrapper'; // Import your wrapper here

function Dashboard() {
  const { user } = useUser();

  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);

  useEffect(() => {
    if (user) {
      getBudgetList();
      getAllExpenses();
    }
  }, [user]);

  const getBudgetList = async () => {
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend: sql`sum(CAST(${Expenses.amount} AS NUMERIC))`.as('totalSpend'), // Casting amount to numeric
      totalItem: count(Expenses.id).as('totalItem'),
    })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    setBudgetList(result);
  }

  const getAllExpenses = async () => {
    const result = await db.select({
      id: Expenses.id,
      name: Expenses.name,
      amount: Expenses.amount,
      createdAt: Expenses.createdAt
    }).from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expenses.id));

    setExpensesList(result);
  }

  const refreshAllData = () => {
    getBudgetList();
    getAllExpenses();
  };

  return (
    <DashboardWrapper>
      <div className='p-8'>
        <h2 className='font-bold text-3xl'>Hi, {user?.fullName} ✌️</h2>
        <p className='text-gray-500 mt-2'>Here's what happening with your money, Let's Manage your expenses</p>

        <CardInfo budgetList={budgetList} />

        <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
          <div className='md:col-span-2'>
            <BarChartDashboard budgetList={budgetList} /> 
            <ExpenseListTable
              expensesList={expensesList}
              refreshData={refreshAllData}
            />
          </div>
          <div className='grid gap-5'>
            <h2 className='font-bold text-lg'>Latest Budgets</h2>
            {budgetList.map((budget, index) => (
              <BudgetItem budget={budget} key={index} />
            ))}
          </div>
        </div>
      </div>
    </DashboardWrapper>
  )
}

export default Dashboard;
