// app/api/brands/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { addCourse } from '@/app/actions/courses';

export async function POST(request: NextRequest) {

  const { title, image, instructorId,description } = await request.json();
  
  const result = await addCourse({title:title, imageUrl:image, instructorId:instructorId, description:description});
  console.log("this is the course",result);
  
  return NextResponse.json({ success: true,  status:200, result:result});
}