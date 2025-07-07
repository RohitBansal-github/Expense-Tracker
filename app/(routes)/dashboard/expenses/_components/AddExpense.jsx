"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { Loader } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";

function AddExpense({ budgetId, refreshData }) {
  const { userId } = useAuth(); // 🔑 Current user ID
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  async function addNewExpense() {
    if (!userId) return;
    if (!name || !amount) return toast.error("Please fill all fields!");
    if (isNaN(amount) || Number(amount) <= 0) return toast.error("Enter a valid amount!");

    setLoading(true);

    try {
      const inserted = await db
        .insert(Expenses)
        .values({
          name,
          amount: Number(amount),
          budgetId,
          createdAt: moment().format("DD/MM/YYYY"),
          createdBy: userId, // 🔒 Store owner
        })
        .returning();

      if (inserted.length) {
        toast.success("New Expense Added!");
        setName("");
        setAmount("");
        refreshData();
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }

    setLoading(false);
  }

  return (
    <div className="border p-5 rounded-lg">
      <h2 className="font-bold text-lg">Add Expense</h2>

      <div className="mt-2">
        <h2 className="text-black font-medium my-1 ml-1">Expense Name</h2>
        <Input
          placeholder="e.g. Bedroom Decor"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mt-2">
        <h2 className="text-black font-medium my-1 ml-1">Expense Amount</h2>
        <Input
          placeholder="eg. ₹1000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <Button
        disabled={!(name && amount) || loading}
        onClick={addNewExpense}
        className="mt-3 bg-green-600 hover:bg-green-500 w-full"
      >
        {loading ? <Loader className="animate-spin" /> : "Add New Expense"}
      </Button>
    </div>
  );
}

export default AddExpense;
