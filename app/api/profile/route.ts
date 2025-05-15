import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import authOptions from "@/app/lib/auth";
import { profileIdSchema } from '@/app/actions/profile/schema';
import { prisma } from '@/app/db';


export async function POST(request: NextRequest) {

    const session = await getServerSession(authOptions);

    if (!session || !session?.user.id ) {
      return { error: "unauthorized" };
    }
  
    const { userId, bio, imageUrl } = await request.json();
    const validateData = profileIdSchema.safeParse(userId);
  
    if (!validateData) {
      return;
    }

  try {
      const existingProfile = await prisma.profile.findFirst({
          where:{
              user:{
                  id: userId
              }
          }
      })
  
      if(existingProfile){
          return NextResponse.json({
              status:500,
              meesage: "Profile already exists"
          })
      }
  
      const createdProfile = await prisma.profile.create({
          data:{
              bio: bio,
              imageUrl:imageUrl,
              user:{
                  connect:{
                      id:userId
                  }
              }
          }, 
      
      })
  
      return NextResponse.json({
        status:200,
        data:createdProfile
      })
  } catch (error) {
    console.log("error while creating profile", error);
    return NextResponse.json({
        status:500,
        message:"internal server error"
    })
  }

  }


    export async function GET(request: NextRequest){
        const session = await getServerSession(authOptions);
        console.log("I am here")

        if (!session || !session?.user.id ) {
        return { error: "unauthorized" };
        }
    
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        console.log(userId)
        if (!userId) {
        return;
        }

        try {

            const user = await prisma.user.findUnique({
                where:{
                    id:userId
                }
            })

            console.log(user)
            const userWithProfile= await prisma.user.findUnique({
                where:{
                    id: userId
                },
                include:{
                    profile:true
                }
            })

            console.log("this is the user with profile",userWithProfile)
            
            return NextResponse.json({
                status:200,
                data:userWithProfile
            })
        } catch (error) {
            console.log("an error occures while getting the profile",error);
            return NextResponse.json({
                status:500,
                message:"Internal Server error"
            })
        }
    }