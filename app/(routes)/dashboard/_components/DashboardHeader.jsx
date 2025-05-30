import { UserButton } from '@clerk/nextjs'
import React from 'react'

function DashboardHeader(){

    return (
        <div className='p-5 shadow-md border-b flex justify-between'>
            <div>
                {/* Search bar */}
            </div>
            <div>
                <UserButton/>
            </div>

        </div>
    )
}

export default DashboardHeader
