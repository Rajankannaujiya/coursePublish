import authOptions from "@/app/lib/auth";
import { prisma } from "@/app/db";
import { getServerSession } from "next-auth";
import { createCourseSchema, baseCourseIdSchema, updateCourseSchema } from "./schema";
import { typeCreateCourseSchema,CourseReturnType,newCourseCreated, typeBaseCouseIdSchema, typeUpdateCourseSchema } from "./types";


const addCourse = async(data:typeCreateCourseSchema)=>{

    const session = await getServerSession(authOptions);

    if(!session || !session?.user?.id || session?.user.role !== "ADMIN" || session.expires) return {error:"unauthorized"}
    

    const validateData = createCourseSchema.safeParse(data);

    if(!validateData)return {error:"invalid data"}
    const {title, imageUrl, instructorId, description} = data;
    console.log(data)

    const existingCourseTitle = await prisma.course.findFirst({
        where:{
            title:{
                equals:title,
                mode:"insensitive"
            }
        }
    })

    console.log(existingCourseTitle)
    if(existingCourseTitle) return{ 
        error:"A course with the given courseId already exist"};

        const courseData: any = {
            title,
            imageUrl,
            description,
          };
          
          if (instructorId) {
            courseData.instructor = {
              connect: { id: instructorId },
            };
          }
          
          await prisma.course.create({
            data: courseData,
          });

    return {
        data:{message:"course successfully created"}}
}

const removeCourse = async(courseId:typeBaseCouseIdSchema)=>{

    const session = await getServerSession(authOptions);

    if(!session || !session?.user?.id || !session?.user.role || session.expires) return {
      
        error:"unauthorized",

    }

    const validateCourseId = baseCourseIdSchema.safeParse(courseId);

    if(!validateCourseId) return{
        error:"incorrect courseId",
    }

    const existingCourse = await prisma.course.findFirst({
        where:{
            id:courseId
        }
    });

    if(!existingCourse) return{

        error:"course doesn't exists in db",
    }

    await prisma.course.delete({
        where:{
            id:existingCourse?.id
        }
    })

    return {
        data:{message:"course deleted successfully",}
    };
}

const getAllCourse = async():Promise<CourseReturnType<newCourseCreated[] | []>>=>{
    const allCourse = await prisma.course.findMany();

    return {
        success:true,
        error:false,
        status:201,
        message:"fetched all courses",
        data: allCourse
    }
}

const getOneCourseById = async(courseId:typeBaseCouseIdSchema)=>{

    
    const validateCourseId = baseCourseIdSchema.safeParse(courseId);

    if(!validateCourseId) return{
        error:"incorrect courseId",
    }

    const existingCourse = await prisma.course.findUnique({
        where:{
            id:courseId
        },
        include:{
            instructor:{
                include:{user:true}
            }
        }
    });

    if(!existingCourse) return {
        error:"course doesn't exist in db",
    }

    return {
        data:existingCourse,
    }

}


const updateCourse= async(data:typeUpdateCourseSchema):Promise<CourseReturnType<newCourseCreated | null>>=>{
    const session = await getServerSession(authOptions);

    if(!session || !session?.user?.id || (session.user.role!== "ADMIN")|| session.expires) return {
        success:false,
        error:true,
        message:"unauthorized",
        status:500
    }

    
    console.log(data)
    const validateCourseId = updateCourseSchema.safeParse(data);

    if(!validateCourseId) return{
        success:false,
        error:true,
        message:"incorrect Id",
        status:500
    }

    const {id, title, instructorId,description } = data

    const existingCourse = await prisma.course.findUnique({
        where:{
            id:id
        }
    });

    if(!existingCourse) return {
        success:false,
        error:true,
        message:"course doesn't exist in db",
        status:409,
    }

    const updatedCourse = await prisma.course.update({
        where:{
            id:existingCourse.id
        },
        data:{
            title:title,
            instructorId:instructorId,
            description:description
        }
    })
    return {
        success:true,
        error:false,
        message:"found the course with uniqueId",
        status:409,
        data:updatedCourse
    }

}


export {addCourse, removeCourse, getAllCourse, getOneCourseById, updateCourse};

