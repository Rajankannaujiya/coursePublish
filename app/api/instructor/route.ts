/* eslint-disable @typescript-eslint/no-unused-vars */
import { getOneInstructor, updateUserToInstructor } from "@/app/actions/instructors";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
      const { userId, workExp } = await request.json()

      const result = await updateUserToInstructor({userId, workExp})
      console.log(result)
      return NextResponse.json({
        status:200,
        result:result
      })
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to update instructor' },
        { status: 500 }
      )
    }
  }

  export async function GET(request:NextRequest) {
    try {
      const { instructorId } = await request.json()

      const result = await getOneInstructor(instructorId)
      console.log(result)
      return NextResponse.json({
        status:200,
        result:result
      })
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to get instructor' },
        { status: 500 }
      )
    }
  }