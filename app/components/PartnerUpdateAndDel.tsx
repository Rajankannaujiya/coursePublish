"use client"

import React, { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Button } from './Button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ErrorComp } from './ErrorComp';

const PartnerUpdateAndDel = ({partnerId}:{partnerId:string}) => {

  const [options, setShowOptions] = useState(false)
  const session = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('');

  const handleDeletePartner = async()=>{
    if(!partnerId) {
      setError("all the fields are required");
      return
    };
    setIsSubmitting(true)
   try {
    const response = await fetch('/api/partners/delete/',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        partnerId:partnerId
      }),
    })
    if(!response.ok){
      setError('failed to update partner')
    }

    const data = await response.json();
    console.log('deleted brand:', data.brand);
    router.push('/')
   } catch (error) {
    console.log("an error occured", error)
    setError("Internal server error")
    
  }
  finally{
    setError('');
    setIsSubmitting(false)
  }
}

if(error) return <ErrorComp error={error}/>


  return (
    session.data?.user.role ==='ADMIN' &&
    <div className='top-2 cursor-pointer'>
      <div onClick={()=>setShowOptions(!options)}>
      <MoreHorizIcon/>
    </div>

    {options && <div className=''>
      <Button className='bg-green-600 text-midnight-blue-50 font-bold mb-2' onClick={()=>router.push(`/admin/partners/update/${partnerId}`)}>
        Update
      </Button>
      <Button className='bg-red-600 text-midnight-blue-50 font-bold' onClick={handleDeletePartner}>
        {isSubmitting? "Processing.." : "Delete"}
      </Button>
    </div>}
    </div>
  )
}

export default PartnerUpdateAndDel

