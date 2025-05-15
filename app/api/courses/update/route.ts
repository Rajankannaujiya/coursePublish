import { updateCourse } from "@/app/actions/courses";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    
    const { courseId, title, instructorId, description } = await request.json();
    const result = await updateCourse({id:courseId,title:title, instructorId:instructorId, description:description});
    console.log("this is the course",result);
    
    return NextResponse.json({ success: true,  status:200, result:result});
  }