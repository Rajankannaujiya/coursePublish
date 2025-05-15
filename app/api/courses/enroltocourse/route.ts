
import { prisma } from '@/app/db';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {

  const { userId, courseId } = await request.json();

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const course = await prisma.course.findUnique({ where: { id: courseId } });

    if (!user || !course) {
      return { error: "User or course not found" };
    }
   await prisma.$transaction([

     prisma.user.update({
      where: { id: userId },
      data: {
        course: {
          connect: { id: courseId },
        },
      },
    }),

    prisma.certificate.create({
      data: {
        userId,
        courseId,
        userName: user.name,
        courseTitle: course.title,
        hash: uuidv4(), // or some other unique hash logic
      },
    })
   ])

  

    return NextResponse.json({ success: true,  status:200});
  } catch (error) {
    console.error("Enrollment error:", error);
    return NextResponse.json({ success: false,  status:400});

  }
}
  