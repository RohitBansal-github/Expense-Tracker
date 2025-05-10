'use client';

import { LayoutGridIcon, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

function SideNav() {
  const path = usePathname()

  const menuList = [
    { id: 1, name: 'Dashboard', icon: LayoutGridIcon, path: '/dashboard' },
    { id: 2, name: 'Budgets', icon: PiggyBank, path: '/dashboard/budgets' },
    { id: 3, name: 'Expenses', icon: ReceiptText, path: '/dashboard/expenses' },
    { id: 4, name: 'Upgrade', icon: ShieldCheck, path: '/dashboard/upgrade' },
  ]

  return (
    <div className="h-screen w-full md:w-64 p-4 shadow-md border-r">
      <Image src="/logo.svg" alt="logo" width={140} height={80} />

      <div className="mt-4">
        {menuList.map((menu) => (
          <Link key={menu.id} href={menu.path}>
            <h2
              className={`flex gap-2 items-center text-gray-500 font-medium p-3 cursor-pointer rounded-md
                hover:text-primary hover:bg-blue-100 text-sm
                ${path === menu.path && 'text-primary bg-blue-100'}`}
            >
              <menu.icon className="w-5 h-5" />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>

      <div className="absolute bottom-4 p-3 flex gap-2 items-center sm:bottom-5 sm:p-4">
        <UserButton />
        <span className="text-xs sm:text-sm">Profile</span>
      </div>
    </div>
  )
}

export default SideNav;
