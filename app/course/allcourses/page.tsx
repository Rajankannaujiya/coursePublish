
import { getAllCourse } from '@/app/actions/courses'
import { CardContainer } from '@/app/components/Card';
import CenterComp from '@/app/components/Centercomp';
import React from 'react'
import { CourseLayout } from '@/app/components/CourseLayout';

const page = async() => {
    const courses = await getAllCourse();
    console.log("this is the all course",courses);
  return (
    <CenterComp className='w-full m-4 p-2 md:w-4xl overflow-hidden overflow-y-auto no-scrollbar'>
    <div className='flex justify-between items-center w-full'>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
     {courses.data?.map((course, index) => (
        <CardContainer key={index}>
          <CourseLayout course={course}/>
        </CardContainer>
      ))}
      
    </div>
    </div>
    </CenterComp>

  )
}

export default page
