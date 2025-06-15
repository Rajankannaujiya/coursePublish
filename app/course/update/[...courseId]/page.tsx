"use client"

import React, { useEffect, useState } from 'react'
import {Input} from '@/app/components/Input'
import Label from '@/app/components/Label'
import CancelButton from '@/app/components/CancelButton'
import MakeCenter from '@/app/components/MakeCenter'
import { useParams, useRouter } from 'next/navigation'
import Loading from '@/app/components/Loading'
import { ErrorComp } from '@/app/components/ErrorComp'
import { useAppDispatch, useAppSelector } from '@/app/store/hook'
import { fetchInstructors } from '@/app/store/features/instructor'

export default function AddCourse() {
  const [title, setTitle] = useState('');
  const [selectInstructor, setSelectInstructor] = useState<string>('');

  const [errorMessage, setErrorMessage] = useState('');
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false);

  const params = useParams();
  const courseId = params?.courseId ? params?.courseId[0] : ""
  console.log(courseId)
  const router = useRouter()

  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.instructor);

  console.log("details", title, selectInstructor, description )

  useEffect(() => {
    dispatch(fetchInstructors());
  }, [dispatch]);

  if (error) {
    setErrorMessage(error);
  }

  if (loading) return <Loading />


  const handleSubmitCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    

    if (!title  || !description) {
      setErrorMessage('Please fill all fields');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch('/api/courses/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId,
          title,
          instructorId: selectInstructor  ? selectInstructor : undefined,
          description
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create course');
      }

      const data = await response.json();
      console.log(data)
      setTitle('');
      setSelectInstructor('');
      setDescription('');
      setErrorMessage('');
      
      router.push('/');
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage('Internal server error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <MakeCenter>
      {/* Added form element wrapping all inputs and submit button */}
      <form onSubmit={handleSubmitCourse} className="w-full">
        <h1 className='text-midnight-blue-600 font-extrabold text-3xl'>Update Course</h1>
        {errorMessage && <ErrorComp error={errorMessage}/>}
        <div className='flex justify-center flex-col gap-4 w-full'>
          <div className='m-1 p-1'>
            <Input 
              type='text' 
              placeholder='title of the course' 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className='border-2 border-midnight-blue-800 p-1'
            />
          </div>
          

          <div className='flex flex-col justify-between items-center pb-1 mb-4'>
            <Label className='p-1 font-bold text-xl'>Choose Instructor</Label>
            <select 
            value={selectInstructor}
            onChange={(e) => setSelectInstructor(e.target.value)}
            className='border-2 border-midnight-blue-800 p-2 w-full hover:border-midnight-blue-400 rounded-md'
          >
            <option value="">Select an instructor</option> {/* Default empty option */}
            {Array.isArray(data) && data.map((instructor:any) => (
              <option 
                key={instructor?.id}
                value={instructor?.id}
                className='cursor-pointer font-bold text-midnight-blue-900'
              >
                {instructor?.user?.name}
              </option>
            ))}
          </select>
          </div>
          
          <div className='mb-3 p-1'>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder='Enter the description'
              className='border-2 border-midnight-blue-800 p-1 w-full rounded-md'
            />
          </div>
        </div>

        <div className='flex justify-end gap-3'>
          <CancelButton disabled={false}/>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-midnight-blue-600 rounded-md hover:bg-midnight-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "Processing..." : "Save Changes"}
          </button>
        </div>
      </form>
    </MakeCenter>
  )
}
