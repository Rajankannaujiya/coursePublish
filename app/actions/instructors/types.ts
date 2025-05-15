
import { z } from "zod"
import { courseToInstructor, instructorIdSchema, updateUserToInstructorSchema } from "./schema"

export type TypeUpdateUserToInstructorSchema = z.infer<typeof updateUserToInstructorSchema>

export type TypeCourseToInstructor = z.infer<typeof courseToInstructor>

export type TypeInstructorIdSchema = z.infer<typeof instructorIdSchema>

export type ReturnTypeInstructorCourse = {
    success:boolean,
    error:boolean,
    message?:string,
    status:number
}