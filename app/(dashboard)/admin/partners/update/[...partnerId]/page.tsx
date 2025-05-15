
import UpdatePartner from '@/app/(dashboard)/components/UpdatePartner';
import CenterComp from '@/app/components/Centercomp';
import React from 'react'

const page = async ({ params }: { params: Promise<{ partnerId: string }> }) => {
    const { partnerId } = await params;
    console.log(partnerId)
  return (
    <CenterComp className='flex justify-center items-center w-full'>
      <UpdatePartner />
    </CenterComp>
  )
}

export default page