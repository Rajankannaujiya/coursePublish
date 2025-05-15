import authOptions from "@/app/lib/auth";
import { prisma } from "@/app/db";
import { getServerSession } from "next-auth";
import { TypeBaseUserSchema } from "@/app/lib/globalType";
import { ReturnTypeUser } from "./types";


export async function getAllUser():Promise<ReturnTypeUser<TypeBaseUserSchema[]>>{
    const session = await getServerSession(authOptions);

    if(!session || !session.user || session.expires){
        return {
            success:false,
            error:true,
            message:"unauthorized",
            status:500,
        }
    }

    const allUser = await prisma.user.findMany({
        where:{
            role:"USER"
        }
    });

    return {
        success:true,
        error:false,
        message:"successfully fetched all the users",
        status:200,
        data:allUser
    };
}


