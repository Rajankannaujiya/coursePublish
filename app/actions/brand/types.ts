
import { z } from "zod"
import { DeleteBrandSchema, InputBrandSchema, UpdateBrandSchema } from "./schema"

export type TypeInputBrandSchema = z.infer<typeof InputBrandSchema>
export type TypeDeleteBrandSchema = z.infer<typeof DeleteBrandSchema>
export type TypeUpdateBrandSchema = z.infer< typeof UpdateBrandSchema>

export type Brand ={
    id:string,
    bName:string
    bLogo:string
    createdAt: Date;
    updatedAt: Date;
}

export type BrandReturnType<T> = {
    success:boolean,
    error:boolean,
    message?:string,
    status:number,
    data?:T
}