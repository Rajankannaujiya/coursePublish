'use client'

import { signIn, useSession } from 'next-auth/react'
import React from 'react'
import SearchPage, { SearchPageCourse } from '../(dashboard)/admin/search/page'
import { Button } from './Button'
import Avatar from './Avatar'

interface User {
  imageUrl: string;
}

const Navbar = (user: User) => {
  

  const session = useSession()


  return (
    <nav className='w-full flex items-center justify-between p-4 bg-midnight-blue-50 border-b-2 border-b-midnight-blue-950 sticky z-50'>
      {/* Logo - centered on mobile, left-aligned on larger screens */}
      <div className='lg:flex-1 flex justify-center lg:justify-start mx-4'>
        <h1 className='text-2xl font-extrabold text-midnight-blue-600'>pytechh</h1>
      </div>

      {/* Search - hidden on mobile, shown on lg screens */}
      <div className='hidden lg:flex flex-1 justify-center'>
        <SearchPageCourse />
      </div>

      {/* Actions - right-aligned with responsive spacing */}
      <div className='flex items-center space-x-2 sm:space-x-4 lg:flex-1 lg:justify-end'>
       {!session.data?.user && <Button className='hidden sm:inline-flex text-midnight-blue-200 text-lg px-4 sm:px-6 bg-midnight-blue-900 hover:bg-midnight-blue-800 transition-colors' onClick={()=>signIn()}>
          Signin
        </Button>}
        
        {!session.data?.user && <Button className='hidden sm:inline-flex text-lg text-midnight-blue-200 bg-midnight-blue-950 px-4 sm:px-6 hover:bg-midnight-blue-900 transition-colors' onClick={()=>signIn()}>
          Join Now 
        </Button>}
        
        <div className='p-1 gap-1 flex justify-center'>
          <Avatar imageUrl={user?.imageUrl} /> <h2 className='text-xl text-midnight-blue-950 mx-1 px-1 mt-2'>{session.data?.user?.name}</h2>
        </div>
      </div>
    </nav>
  )
}


export default Navbar