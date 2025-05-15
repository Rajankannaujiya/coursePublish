import { getOneCourseById } from "@/app/actions/courses";
import CenterComp from "@/app/components/Centercomp";
import SingleInstructor from "@/app/components/SingleInstructor";
import Image from "next/image";
import React from "react";
import { Button } from "../../components/Button"
import { HandleEnroll } from "../enrollusertocourse/page";
import { UpdateButton } from "@/app/components/DeleteCourseComp";

const page = async ({ params }: { params: Promise<{ courseId: string }> }) => {
  const { courseId } = await params;

  const acturalId = courseId[0];
  const findCourse = await getOneCourseById(acturalId);
  console.log(findCourse)

  let course;

  if (findCourse.data) {
    course = findCourse?.data;
  }

  return (
    <CenterComp className="w-full h-full lg:w-7xl flex flex-wrap overflow-hidden overflow-y-scroll no-scrollbar ">
     <div className="lg:grid lg:grid-cols-2 flex flex-col gap-8 md:gap-3 relative">
  {/* Left Section */}
  <div className="flex justify-center items-center z-40 rounded-md">
        {course && (
          <div className="flex justify-start  md:justify-center flex-wrap flex-col items-center m-3 p-3 rounded-md">
            <div>
              <div className="flex gap-4 justify-between flex-col md:flex-row">
                <div>
                  <div className="font-extrabold text-midnight-blue-950 text-3xl underline">
                    <p className="m-1 p-1">{course.title}</p>
                  </div>
                  <div className=" gap-4 flex  justify-start md:justify-around p-2 text-3xl text-midnight-blue-800">
                    <h1 className="text-midnight-blue-950 underline">
                      Instructor:
                    </h1>
                    <div>
                    {course.instructorId   ? <SingleInstructor instructorId={course.instructorId} /> : <div className="text-midnight-blue-900 font-bold">not assigned</div>}
                    </div>
                    
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex gap-1">
                    <h2 className="m-2 p-2 underline font-bold text-midnight-blue-700">
                      Crated At:
                    </h2>
                    <p className="m-2 p-2 text-gray-600">
                      {course.createdAt.toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex gap-1">
                    <h2 className="m-2 p-2 underline font-bold text-midnight-blue-700">
                      Updated At:
                    </h2>
                    <p className="m-2 p-2 text-gray-600">
                      {course.updatedAt.toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
              <Image
                src={course.imageUrl}
                alt="course image"
                width={500}
                height={500}
                className="w-lg md:w-md p-2 m-4 rounded-md"
              />
            </div>

            <div className=" z-10 flex flex-col m-3 p-4 rounded-md gap-2 justify-center items-center">
              <div className="text-xl text-midnight-blue-800">
                {course.description}
              </div>

              <Button className="bg-midnight-blue-950 text-midnight-blue-50">Explore now</Button>
            </div>
          </div>
        )}
      </div>
  <div className="flex flex-col items-start z-40 rounded-md mt-20">

        <div className="flex justify-center gap-4">
        <HandleEnroll courseId={courseId[0]} />
        <UpdateButton courseId={courseId[0]}/>
        </div>
          <div className="text-xl text-midnight-blue-900 m-2">
                {course?.description}
              </div>
        <div className=" gap-4 flex  justify-start md:justify-around p-2 text-3xl text-midnight-blue-800">
                    <h1 className="text-midnight-blue-950 underline">
                      Instructor:
                    </h1>

                    <div>
                    {course?.instructorId   ? <SingleInstructor instructorId={course.instructorId} /> : <div className="text-midnight-blue-900 font-bold">not assigned</div>}
                    </div>

                  </div>
      </div>
     </div>

      
    </CenterComp>
  );
};

export default page;
