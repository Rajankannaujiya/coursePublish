

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/lib/auth';
import { prisma } from '@/app/db';

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const userId= session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: 'UserId is required' }, { status: 400 });
    }

    const userWithCourses = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        course:true
      },
    });


    return NextResponse.json({ enrolledCourses: userWithCourses?.course }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
