import { prisma } from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { userId, courseId } = await req.json();
  
    if (!userId || !courseId) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }
  
    const isEnrolled = await prisma.user.findFirst({
      where: {
        id: userId,
        course: {
          some: { id: courseId },
        },
      },
    });
  
    if (isEnrolled) {
      return NextResponse.json({ enrolled: true });
    } else {
      return NextResponse.json({ enrolled: false });
    }
  }