import { getProfileOfOneUser } from '@/app/actions/profile'
import CenterComp from '@/app/components/Centercomp'
import React from 'react'
import CreateProfile from '../page';
import UserProfile from '@/app/components/UserProfile';

  const page = async ({ params }: { params: Promise<{ userId: string }> }) => {
    const { userId } = await params;
  
    const acturalId = userId[0];

  const profiledata = await getProfileOfOneUser(acturalId);
  console.log("this is the profile data",profiledata)

  if(!profiledata){
    return <CreateProfile />
  }
  return (
    <CenterComp className='flex justify-center items-center w-full'>
      <UserProfile />
    </CenterComp>
  )
}

export default page