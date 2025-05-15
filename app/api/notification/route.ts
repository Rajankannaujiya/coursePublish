
import { sentDetailNotification } from "@/app/lib/mailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){

    try {
    const { name, email, profession, yearOfGraduation, course } = await request.json();

  if (!name || !email || !profession || !yearOfGraduation || !course) {
    return NextResponse.json({
        error:"missing feilds"
    });
  }

  await sentDetailNotification(name, email, profession, yearOfGraduation, course)

  return NextResponse.json({
    status:200,
    message:"Notification sent successfully"
  });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
        status:500,
        message:"Cannot sent Notification sent successfully"
      });
  }

}