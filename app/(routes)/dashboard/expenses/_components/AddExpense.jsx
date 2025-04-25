import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { Loader } from 'lucide-react';
import moment from 'moment';
import React, { useState } from 'react'
import { toast } from 'sonner';

function AddExpense({ budgetId, user, refreshData }) {


  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState(false);

  async function addNewExpense() {
    setLoading(true);
    console.log("name:", name);
    console.log("amount:", amount);
    console.log("budgetId:", budgetId);

    if (!name || !amount) {
      toast.error("Please fill all fields!");
      return;
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      toast.error("Enter a valid amount!");
      return;
    }

    try {
      console.log("Inserting into DB...");

      const result = await db.insert(Expenses).values({
        name,
        amount: Number(amount),
        budgetId,
        createdAt: moment().format('DD/MM/YYYY')
      }).returning({ insertedId: Expenses.id });

      setAmount('');
      setName('');

      if (result.length > 0) {
        setLoading(false);
        refreshData();
        setName('');
        setAmount('');
        toast.success('New Expense Added!');
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    }
    setLoading('')
  }


  return (
    <div className='border p-5 rounded-lg'>
      <h2 className='font-bold text-lg'>Add Expense</h2>
      <div className='mt-2'>
        <h2 className='text-black font-medium my-1 ml-1'>Expense Name</h2>
        <Input placeholder="e.g. Bedroom Decor"
          value={name}
          onChange={(e) => setName(e.target.value)} />
      </div>
      <div className='mt-2'>
        <h2 className='text-black font-medium my-1 ml-1'>Expense Amount</h2>
        <Input placeholder="eg. ₹1000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)} />
      </div>
      <Button disabled={!(name && amount) || loading}
        onClick={() => addNewExpense()}
        className="mt-3 bg-green-600 hover:bg-green-500 cursor-pointer w-full"
      > {loading ?
        <Loader className='animate-spin' />
        : "Add New Expense"
        }
      </Button>
    </div>
  )
}

export default AddExpense;
