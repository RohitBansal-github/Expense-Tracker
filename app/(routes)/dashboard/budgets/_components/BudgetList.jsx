'use client'
import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import { eq, getTableColumns, sql, sum, count, desc } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema'
import { db } from '@/utils/dbConfig'
import { useUser } from '@clerk/nextjs'
import BudgetItem from './BudgetItem';

function BudgetList() {

  const [budgetList, setBudgetList] = useState([]);

  const { user } = useUser();

  useEffect(() => {
    user && getBudgetList();
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

  return (
    <div className='mt-7'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <CreateBudget refreshData={()=>getBudgetList()}/>
        {budgetList?.length>0?budgetList.map((budget, index) => {
          // Add a return statement here to render BudgetItem
          return <BudgetItem key={index} budget={budget} />;
        }):[1,2,3,4,5].map((item,index)=>(
           
          <div key={index} className='w-full bg-slate-300 rounded-lg h-[145px] animate-pulse'>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BudgetList;
