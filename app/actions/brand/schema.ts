import { z } from "zod";


export const InputBrandSchema = z.object({
    brandName:z.string().nonempty("brand name is required").min(2,"bname is too short"),
    brandLogo: z.string().url()
})

export const DeleteBrandSchema = z.string().url().nonempty("id is required")


export const UpdateBrandSchema = InputBrandSchema.partial().extend({
    partnerId:z.string().uuid().nonempty()
})