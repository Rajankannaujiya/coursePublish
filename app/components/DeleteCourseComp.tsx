
"use client"
import React, { useState } from 'react'
import { Button } from './Button'
import { ErrorComp } from './ErrorComp';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export const DeleteCourseComp = ({courseId}:{courseId:string}) => {

    const [error, setError] = useState('');
    const router = useRouter();

    const handleDelete = async()=>{
        try {
            const response = await fetch('/api/courses/delete',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  courseId
                }),
            });

            if(!response.ok){
                setError("Error while deleting")
                throw new Error('Failed to delete course');
            }

            const data = await response.json();
            console.log(data);
            setError('')
            router.push('/')
        } catch (error) {
            console.log(error)
            setError("internal server error")
        }
      }
  return (
        <div>
            <div className='flex justify-end'>
            <Button variant='outline' className='text-white bg-red-700' onClick={handleDelete}>Delete</Button>
        </div>
        {error && <ErrorComp error={error}/>}
        </div>
  )
}


export const UpdateButton = ({courseId}:{courseId:string})=>{
    const session = useSession();
    const router = useRouter()
    return(session.data?.user.role==='ADMIN' &&
        <Button variant='outline' className='text-white bg-green-700 cursor-pointer' onClick={()=>router.push(`/course/update/${courseId}`)}>Update</Button>
    )
}


export const ExploreCourseButton = ()=>{
 
    const router = useRouter()
    return(
        <Button variant='outline' className='text-white bg-green-700 cursor-pointer mt-4' onClick={()=>router.push(`/course/allcourses`)}>Explore Courses</Button>
    )
}