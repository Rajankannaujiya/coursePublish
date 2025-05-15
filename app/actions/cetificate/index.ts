import authOptions from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { typeBaseCouseIdSchema } from "../courses/types";
import { prisma } from "@/app/db";


export async function getCertificate(courseId:typeBaseCouseIdSchema){

    const session = await getServerSession(authOptions);
  
    if (!session || !session.user?.id) {
      return { error: 'Unauthorized' };
    }
  

  
    if (!courseId) {
      return { error: 'Course ID is required' };
    }
  
    try {
      const certificate = await prisma.certificate.findUnique({
        where: {
          userId_courseId:{
            userId:session?.user.id,
            courseId:courseId
          }
        }
      });
  
      console.log("this is the certificate from server action",certificate)

      if (!certificate) {
        return { error: 'Certificate not found' };
      }

  
      return {
        data: certificate
      };
    } catch (err) {
      console.error('Error fetching certificate:', err);
      return { error: 'Server error' };
    }
  }