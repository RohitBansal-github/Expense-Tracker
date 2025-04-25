"use client"
import { Button } from '@/components/ui/button'
import { PenBox } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"

import EmojiPicker from 'emoji-picker-react'
import { useUser } from '@clerk/nextjs'
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'

function EditBudget({ budgetInfo,refreshData }) {
    const [emojiIcon, setemojiIcon] = useState(budgetInfo?.icon);
    const [openEmojiPicker, setopenEmojiPicker] = useState(false);

    const [name, setName] = useState(budgetInfo?.name);
    const [amount, setAmount] = useState(budgetInfo?.amount);
    const { user } = useUser();

    useEffect(()=>{
        if(budgetInfo){
            setemojiIcon(budgetInfo?.icon);
            setAmount(budgetInfo?.amount);
            setName(budgetInfo?.name);

        }
    },[budgetInfo])

    const onUpdateBudget = async() => {
        // backend update logic yahan add karo
        const result=await db.update(Budgets).set({
            name:name,
            amount:amount,
            icon:emojiIcon,
        }).where(eq(Budgets.id,budgetInfo.id))
        .returning();

        if(result){
            refreshData();
            toast('Budget Updated!');
        }

    };

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="flex gap-2 bg-green-600 hover:bg-green-500 cursor-pointer">
                        <PenBox />Edit
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Budget</DialogTitle>
                        <DialogDescription>
                            <div className="mt-5">
                                <Button variant="outline"
                                    className="text-lg"
                                    onClick={() => setopenEmojiPicker(!openEmojiPicker)}
                                >{emojiIcon}</Button>

                                {openEmojiPicker && (
                                    <div className='absolute z-20'>
                                        <EmojiPicker
                                            onEmojiClick={(e) => {
                                                setemojiIcon(e.emoji)
                                                setopenEmojiPicker(false)
                                            }}
                                        />
                                    </div>
                                )}

                                <div className='mt-2'>
                                    <h2 className='text-black font-medium my-1 ml-1'>Budget Name</h2>
                                    <Input
                                        placeholder="eg. manali trip"
                                        defaultValue={budgetInfo?.name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className='mt-2'>
                                    <h2 className='text-black font-medium my-1 ml-1'>Budget Amount</h2>
                                    <Input
                                        type="number"
                                        defaultValue={budgetInfo?.amount}
                                        placeholder="eg. ₹10000/-"
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button
                                disabled={!(name && amount)}
                                onClick={onUpdateBudget}
                                className="mt-5 w-full bg-green-700 hover:bg-green-600 cursor-pointer"
                            >
                                Update Budget
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditBudget
