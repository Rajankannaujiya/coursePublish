"use server"

import { getServerSession } from "next-auth";
import authOptions from "@/app/lib/auth";
import { prisma } from "@/app/db";
import { courseToInstructor, instructorIdSchema, updateUserToInstructorSchema } from "./schema";
import {
  ReturnTypeInstructorCourse,
  TypeCourseToInstructor,
  TypeInstructorIdSchema,
  TypeUpdateUserToInstructorSchema,
} from "./types";
// import { TypeInstructorsSchema } from "@/app/lib/globalType";

export const updateUserToInstructor = async (data: TypeUpdateUserToInstructorSchema) => {
  console.log(data)
  const session = await getServerSession(authOptions);

  if (!session || !session?.user.id || session?.user.role !== "ADMIN") {
    return { error: "unauthorized" };
  }

  const validateData = updateUserToInstructorSchema.safeParse(data);

  if (!validateData) {
    return;
  }
  const { userId, workExp } = data;

  if (!userId) return { error: "userId is required to make a user Instructor" };

  try {
    const user = await prisma.$transaction(async (prisma) => {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          role: "INSTRUCTOR",
        },
      });

      await prisma.instructor.upsert({
        where: {
          userId,
        },
        create: {
          userId: userId,
          workExp: workExp,
          profession: "Instructor",
        },
        update: {},
      });
    });

    return;
  } catch (error) {
    console.log("An error has been occured", error);
    throw new Error("Unable to change role");
  }
};

export const getOneInstructor = async (instructorId:TypeInstructorIdSchema)=>{
  const session = await getServerSession(authOptions)
  if (!session || !session?.user.id || session?.user.role !== "ADMIN") {
    return { error: "unauthorized" };
  }

  if(!instructorId) return {error:"instructorId is required"};

  try {
    const instructor = await prisma.instructor.findUnique({
      where:{
        id:instructorId
      },
      include:{
        user:true
      }
    })

    return instructor;
  } catch (error) {
    console.log(error)
    throw new Error("Unable to change role");
  }
}

// check its type and then assign it
export const  getAllInstructors = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user?.id || session.expires) return null;

  const allInstructor = await prisma.instructor.findMany({  
    where:{
      user:{
        role:'INSTRUCTOR'
      }
    },
    include: {
      user: {
        include: {
          profile: {
            select: {
              id: true,
              bio: true,
              imageUrl: true,
            },
          },
        },
        omit: {
          password: true,
        },
      },
      courses: {
        omit: {
          instructorId: true,
        },
        include: {
          enrolledUsers: true,
        },
      },
    },
  });

  if (!allInstructor) return null;

  return allInstructor;
};


// this need to be implemented
export const assignCourseToInstruction = async (
  data: TypeCourseToInstructor
): Promise<ReturnTypeInstructorCourse> => {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user?.id || session.expires)
    return {
      success: false,
      error: true,
      message: "unauthorized",
      status: 500,
    };

  const validateData = courseToInstructor.safeParse(data);

  if (validateData)
    return {
      success: false,
      error: true,
      message: "unauthorized",
      status: 409,
    };
  const { courseId, instructorId } = data;
  try {
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      select:{
        instructorId:true
      }
    });

    const instructor = await prisma.instructor.findUnique({
      where: {
        id: instructorId,
      },
      include: {
        courses: true,
      },
    });

    if (!instructor || !course)
      return {
        success: false,
        error: true,
        message: "not found",
        status: 405,
      };

    const isAlreadyAssigned = instructor.courses.some((course) => {
      return course?.id === courseId;
    });
    if (isAlreadyAssigned)
      return {
        success: false,
        error: true,
        message: "Already assigned",
        status: 409,
      };

    await prisma.$transaction(async (prisma) => {
      await prisma.instructor.update({
        where: {
          id: instructorId,
        },
        data: {
          courses: {
            connect: {
              id: courseId,
            },
          },
        },
      });

      await prisma.course.update({
        where: {
          id: courseId,
        },
        data: {
          instructorId: instructorId,
        },
      });
    });

    return {
      success: true,
      error: false,
      message: "Course successfully assigned to instructor",
      status: 200,
    };
  } catch (error) {
    console.error("Assignment error:", error);
    return {
      success: false,
      error: true,
      message: "Internal server error",
      status: 500,
    };
  }
};

// this need to be implemented
export const removeCourseFromInstructor = async(data:TypeCourseToInstructor):Promise<ReturnTypeInstructorCourse> =>{
  const session = await getServerSession(authOptions);

  if (!session || !session?.user?.id || session.expires)
    return {
      success: false,
      error: true,
      message: "unauthorized",
      status: 500,
    };

  const validateData = courseToInstructor.safeParse(data);

  if (validateData)
    return {
      success: false,
      error: true,
      message: "unauthorized",
      status: 409,
    };

    const { courseId, instructorId } =data

  try {
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      select:{
        instructorId:true
      }
    });
    const instructor = await prisma.instructor.findUnique({
      where: {
        id: instructorId,
      },
      include: {
        courses: true,
      },
    });

    if (!instructor || !course)
      return {
        success: false,
        error: true,
        message: "not found",
        status: 405,
      };

    const isAlreadyAssigned = instructor.courses.some((course) => {
      return course?.id === courseId && course?.instructorId === instructorId;
    })

    if (!isAlreadyAssigned)
      return {
        success: false,
        error: true,
        message: "Already assigned",
        status: 409,
      };

    await prisma.$transaction(async()=>{
      await prisma.instructor.update({
        where:{
          id:instructorId
        },
        data:{
          courses:{
            disconnect:{
              id:courseId
            }
          }
        }
      });

      await prisma.course.update({
        where:{
          id:courseId
        },
        data:{
          instructorId:undefined
        }
      })
    })

    return {
      success: true,
      error: false,
      message: "Course successfully assigned to instructor",
      status: 200,
    };

  } catch (error) {
    console.error("Assignment error:", error);
    return {
      success: false,
      error: true,
      message: "Internal server error",
      status: 500,
    };
  }
}

// this need to be implemented
export const getAllCourseOfAInstructor = async(instructorId:TypeInstructorIdSchema)=>{
  const session = await getServerSession(authOptions);
  if (!session || !session?.user?.id || session.expires)
    return {
      success: false,
      error: true,
      message: "unauthorized",
      status: 500,
    };

  const validateData = instructorIdSchema.safeParse(instructorId);

  if(!validateData) return {
    success: false,
    error: true,
    message: "unauthorized",
    status: 409,
  };

  const allCourses = await prisma.course.findMany({
    where:{
      instructorId:instructorId
    }
  })


  return  {
    success: false,
    error: true,
    message: "unauthorized",
    status: 409,
    data:allCourses
  };


}