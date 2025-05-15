import { z } from "zod";

const createCourseSchema = z.object({
    title:z.string().min(3,"title is too short").nonempty("title cannot be empty"),
    imageUrl:z.string().nonempty("imageUrl is necessary").url(),
    instructorId:z.string().nonempty("instructorId is requied").uuid().optional(),
    description:z.string().nonempty("description is required")


})

const updateCourseSchema = z.object({
    id:z.string().uuid().nonempty("id is required"),
    title:z.string().min(3,"title is too short").nonempty("title cannot be empty"),
    instructorId:z.string().nonempty("instructorId is requied").uuid().optional(),
    description:z.string().nonempty("description is required")

})

const baseCourseIdSchema = z.string().uuid().nonempty("courseId cannot be empty");
const baseuserIdSchema = z.string().uuid().nonempty("courseId cannot be empty");


export {createCourseSchema, baseCourseIdSchema, baseuserIdSchema, updateCourseSchema}