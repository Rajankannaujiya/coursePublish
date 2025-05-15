import React from 'react'
import CenterComp from './Centercomp'
import { CardContainer } from './Card'
import { CourseLayout } from './CourseLayout'
import { getAllCourse } from '../actions/courses'
import { ExploreCourseButton } from './DeleteCourseComp'

async function GetTopThreeCourse() {
    const courses = await getAllCourse();

    let topThreeCourse = [];

    if (courses.data && courses.data?.length > 3) {
      topThreeCourse = courses.data.slice(0, 3);
    } else {
      topThreeCourse = courses.data || [];
    }
  return (
    <CenterComp className='w-full m-4 p-2 md:w-4xl overflow-hidden overflow-y-auto no-scrollbar'>
    <div className='flex justify-between items-center w-full flex-col'>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
     {topThreeCourse.map((course, index) => (
        <CardContainer key={index}>
          <CourseLayout course={course}/>
        </CardContainer>
      ))}
      
    </div>
    <ExploreCourseButton />
    </div>
    </CenterComp>
  )
}

export default GetTopThreeCourse