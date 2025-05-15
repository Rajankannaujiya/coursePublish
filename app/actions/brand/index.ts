import { TypeInputBrandSchema, BrandReturnType, Brand, TypeDeleteBrandSchema, TypeUpdateBrandSchema } from "./types"
import { DeleteBrandSchema, InputBrandSchema, UpdateBrandSchema } from "./schema"
import { getServerSession } from "next-auth";
import authOptions from "@/app/lib/auth";
import { prisma } from "@/app/db";


export const createBrand = async(data:TypeInputBrandSchema)=>{

    const session = await getServerSession(authOptions);

    if(!session || !session?.user?.id || session.expires) return {error:"unauthorized"}

    
    const validateData = InputBrandSchema.safeParse(data);

    if(!validateData) return{error:"invalid Admin Id"}

    const {brandName, brandLogo} = data

    await prisma.companyBrand.create({
        data:{
            bName:brandName,
            bLogo:brandLogo
        }
    })

    console.log("uploaded")
    return {
        data:{message:"partner created successfully"}
    }

}


export const deleteBrand = async(partnerId:TypeDeleteBrandSchema):Promise<BrandReturnType< Brand | null >>=>{

    const session = await getServerSession(authOptions);

    if(!session || !session?.user?.id || session.expires || session.user.role !== 'ADMIN') return {
        success:false,
        error:true,
        message:"unauthorized",
        status:500
    }

    
    const validateCourseId = DeleteBrandSchema.safeParse(partnerId);

    if(!validateCourseId) return{
        success:false,
        error:true,
        message:"incorrect Id",
        status:500
    }

    

    const deletedBrand = await prisma.companyBrand.delete({
        where:{
            id:partnerId
        }
    })
    return{
        success:true,
        error:false,
        message:"Brand Deleted SuccessFully",
        status:200,
        data:deletedBrand
    }

}

export const updateBrand = async(data:TypeUpdateBrandSchema):Promise<BrandReturnType< Brand | null >> =>{

    const session = await getServerSession(authOptions);

    if(!session || !session?.user?.id || session.expires || session.user.role!=='ADMIN') return {
        success:false,
        error:true,
        message:"unauthorized",
        status:500
    }

    
    const validateCourseId = UpdateBrandSchema.safeParse(data);

    if(!validateCourseId) return{
        success:false,
        error:true,
        message:"incorrect data",
        status:500
    }

    const {partnerId, brandName, brandLogo } = data

    const updatedBrand = await prisma.companyBrand.update({
        where:{
            id:partnerId
        },
        data:{
            ...(brandName && {bName:brandName}),
            ...(brandLogo && {bLogo:brandLogo})
        }
    })

    return {
        success:true,
        error:false,
        message:"Brand updated successfully",
        status:201,
        data:updatedBrand
    }
}

export const getAllBrand = async():Promise<BrandReturnType<Brand[] | []>> =>{


    const getAllBrands = await prisma.companyBrand.findMany();

    return {
        success:true,
        error:false,
        message:"Brand updated successfully",
        status:201,
        data:getAllBrands
    }
}