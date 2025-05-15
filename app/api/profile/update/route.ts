import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/lib/auth";
import { profileIdSchema } from "@/app/actions/profile/schema";
import { prisma } from "@/app/db";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user.id) {
    return { error: "unauthorized" };
  }

  const { userId, bio, imageUrl } = await request.json();
  const validateData = profileIdSchema.safeParse(userId);

  if (!validateData) {
    return;
  }
  try {
    const updatedDetail = await prisma.profile.update({
      where: {
        userId: userId,
      },
      data: {
        bio: bio,
        imageUrl: imageUrl,
      },
    });

    if (!updatedDetail) {
      return NextResponse.json({
        status: 500,
        message: "Cannot able to update profile",
      });
    }

    return NextResponse.json({
      status: 200,
      data: updatedDetail,
    });
  } catch (error) {
    console.log("An error occured while uploading", error);
    return NextResponse.json({
      status: 400,
      message: "internal server error",
    });
  }
}
