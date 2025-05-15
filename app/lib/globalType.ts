import { z } from "zod";

import { BaseCourseSchema , BaseProfileSchema, BaseUserSchema, InstructorsSchema } from "./globalSchema"


export type TypeBaseCourseSchema = z.infer<typeof BaseCourseSchema >

export type TypeBaseProfileSchema = z.infer<typeof BaseProfileSchema>

export type TypeBaseUserSchema = z.infer<typeof BaseUserSchema>

export type TypeBaseInstructorsSchema = z.infer<typeof InstructorsSchema>

export type ReturnTypeData<T> = {
    success:boolean,
    error:boolean,
    message?:string,
    status:number,
    data?:T
}
