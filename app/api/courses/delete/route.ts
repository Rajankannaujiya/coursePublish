import { NextRequest, NextResponse } from 'next/server';
import { removeCourse } from '@/app/actions/courses';

export async function POST(request: NextRequest) {

  const { courseId } = await request.json();
  
  const result = await removeCourse(courseId);
  console.log("this is the course",result);
  
  return NextResponse.json({ success: true,  status:200, result:result});
}