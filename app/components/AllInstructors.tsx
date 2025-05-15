"use client"

import React, { useEffect } from 'react'
import DisplayComp from '../(dashboard)/components/DisplayComp';

import { fetchInstructors } from '../store/features/instructor';
import { useAppDispatch, useAppSelector } from '../store/hook';
import Loading from './Loading';
const AllInstructors = () => {
    
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(state => state.instructor);

    useEffect(()=>{
          dispatch(fetchInstructors());
      
    },[dispatch])

    if (loading) return <div><Loading /></div>;
    if (error) return <div>Error: {error}</div>;

  return (
    <div className=' flex max-h-screen justify-center items-center bg-midnight-blue-50 w-full flex-col overflow-hidden overflow-y-scroll scroll-smooth z-10 no-scrollbar'>
        <div className='text-2xl text-midnight-blue-950 font-extrabold m-2 p-2 border-b-2 border-midnight-blue-950 sticky top-0 z-50'>
            <h1>All the instructors</h1>
        </div>
    <div className='flex w-full flex-col m-2 p-2'>
    {
        Array.isArray(data) && data.length>0 && data?.map((instructor)=>(
          <div key={Math.random()} className='w-full border-b-2 border-gray-400'>
            <DisplayComp name={instructor.user.name} role={instructor.user.role}/>
          </div>
            ))
        }
    </div>
      </div>
  )
}

export default AllInstructors