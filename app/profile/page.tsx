import React from 'react'
import CenterComp from '../components/Centercomp'
import UserProfile from '../components/UserProfile'

const CreateProfile = () => {
  return (
    <CenterComp className='flex justify-center items-center'>
        <UserProfile />
    </CenterComp>
  )
}

export default CreateProfile