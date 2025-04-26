'use client'

import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import React from 'react'

function Header() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push('/dashboard');
    } else {
      router.push('/sign-in?redirect_url=/dashboard'); // after sign-in, auto dashboard pe redirect
    }
  };

  return (
    <div className='p-5 flex justify-between items-center border shadow-sm'>
      <Image src={'/logo.svg'}
        alt='logo'
        width={160}
        height={100} />

      {isSignedIn ? (
        <UserButton />
      ) : (
        <Button onClick={handleGetStarted} className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer">
          Get Started
        </Button>
      )}
    </div>
  )
}

export default Header
