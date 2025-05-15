"use server"

import { getServerSession } from "next-auth";
import authOptions from "@/app/lib/auth";
import { profileIdType } from "./types";
import { profileIdSchema } from "./schema";
import { prisma } from "@/app/db";



//  model User {
//     id       String   @id @unique @default(uuid())
//     email    String
//     name     String
//     password String?
//     role     Role     @default(USER)
//     provider Provider?
//     profile  Profile?
//     course   Course[] @relation("EnrolledUser")
//     certificate Certificate[]
//     instructorProfile Instructor?
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt

// }

// model Profile {
//   id     String    @id @default(uuid())
//   bio    String
//   user   User   @relation(fields: [userId], references: [id])
//   userId String @unique
//   imageUrl String
// }
export const getProfileOfOneUser = async(userId: profileIdType):Promise<any>=>{
    const session = await getServerSession(authOptions);

    if (!session || !session?.user.id) {
      return { error: "unauthorized" };
    }
  
    const validateData = profileIdSchema.safeParse(userId);
  
    if (!validateData) {
      return;
    }
   try {
     const profile = await prisma.profile.findFirst({
         where:{
             user:{
                 id:userId
             }
         },
         include:{
            user:true,
         }
     })

     console.log("this is the profile", profile)
     return profile
   } catch (error) {
        console.log("An error occurs while getting the profile", error)    
   }

}


export const getProfileDetail = async():Promise<any>=>{
  const session = await getServerSession(authOptions);

    if (!session || !session?.user.id) {
      return { error: "unauthorized" };
    }
  
    console.log("this is the session user",session.user.id)
    try {

      const useDetail = await prisma.profile.findFirst({
        where:{
          userId:session.user?.id
        }
      })

      console.log("this is the userDetatil",useDetail)
      
      return useDetail
    } catch (error) {
      console.log("An error occurs while getting the profile", error)    
 }
  
}