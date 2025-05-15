import { z } from "zod"
import { baseCourseIdSchema, createCourseSchema, updateCourseSchema, baseuserIdSchema } from "./schema";

export type typeBaseCouseIdSchema = z.infer<typeof baseCourseIdSchema>
export type typeBaseUserIdSchema = z.infer<typeof baseuserIdSchema>
export type ReturnTypeBaseCouseIdSchema = typeBaseCouseIdSchema;

export type typeCreateCourseSchema = z.infer<typeof createCourseSchema>
export type ReturnTypeCreateCourseSchema = typeCreateCourseSchema;

export type typeUpdateCourseSchema = z.infer<typeof  updateCourseSchema>


export type newCourseCreated = {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        imageUrl: string;
        instructorId: string | null;
        description:  string
        
};

export type CourseReturnType<T> = {
    success:boolean,
    error:boolean,
    message?:string,
    status:number,
    data?:T
}