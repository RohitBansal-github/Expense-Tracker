"use client"
import Image from 'next/image'
import React from 'react'
import { LayoutGridIcon, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

function SideNav() {

    const menuList = [

        {
            id: 1,
            name: 'Dashboard',
            icon: LayoutGridIcon,
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Budgets',
            icon: PiggyBank,
            path: '/dashboard/budgets'
        },
        {
            id: 3,
            name: 'Expenses',
            icon: ReceiptText,
            path: '/dashboard/expenses'
        },
        {
            id: 4,
            name: 'Upgrade',
            icon: ShieldCheck,
            path: '/dashboard/upgrade'
        }
    ]

    const path = usePathname();



    return (
        <div className='h-screen p-5 border shadow
        -sm'>
            <Image src={'/logo.svg'}
                alt='logo'
                width={160}
                height={100}
            />
            <div className='mt-5'>
  {menuList.map((menu) => (
    <Link key={menu.id} href={menu.path}>
      <h2 className={`flex gap-2 items-center text-gray-500 font-medium p-5 cursor-pointer rounded-md
        hover:text-primary hover:bg-blue-100 m-2
        ${path === menu.path && 'text-primary bg-blue-100'}`}>
        <menu.icon />
        {menu.name}
      </h2>
    </Link>
  ))}
</div>

            <div className='fixed bottom-15 p-5 flex gap-2 items-center'>
                <UserButton />
                Profile
            </div>
        </div>
    )
}

export default SideNav