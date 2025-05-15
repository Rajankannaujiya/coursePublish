"use client"

import Image from "next/image";
import {DeleteCourseComp} from "./DeleteCourseComp";
import { newCourseCreated } from "../actions/courses/types";
import { useRouter } from "next/navigation";
import { ErrorComp } from "./ErrorComp";
import SingleInstructor from "./SingleInstructor";
import { useSession } from "next-auth/react";


export const CourseLayout = ({course}:{course:newCourseCreated | null}) =>{
  const router = useRouter();
  const session = useSession();

  
  if (course === null ) {
    return <div className="p-4 text-center">Loading course...</div>;
  }

  if (!course ) {
    return <ErrorComp error={"could not found course"}/>;
  }

  return ( 
 <div className="p-4 h-full" onClick={()=>router.push(`/course/${course.id}`)}>
    <Image 
     src={course.imageUrl}
     alt='course image' 
     className="w-full h-auto mt-4"
     width={500}
     height={500}
   />
   <h1 className="text-xl font-bold mb-2 text-midnight-blue-950">{course.title}</h1>
   <div className='flex justify-between font-extrabold text-midnight-blue-700'>
     <h2>Instructor</h2>
      <SingleInstructor instructorId={course.instructorId}/>
   </div>
   <div className='flex flex-col text-midnight-blue-950'>
     <h3 className='text-xl underline'>Course Detail</h3>
     <p>
  {course.description.length > 50
    ? course.description.slice(0, 50) + "..."
    : course.description}
</p>
   </div>
    {session.data?.user.role==='ADMIN' && <div className="flex justify-around border-t-2 m-2 p-2 border-midnight-blue-800">
     <DeleteCourseComp courseId={course.id}/>
    </div>}
 </div>
 )
}