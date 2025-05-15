import { z } from "zod"

const updateUserToInstructorSchema = z.object({
    userId:z.string().uuid().nonempty("userId is required"),
    workExp:z.number().nonnegative("workExp cannot be negative")
});


const courseToInstructor = z.object({
    courseId: z.string().uuid().nonempty("courseId cannot be empty"),
    instructorId:z.string().uuid().nonempty("instructorId cannot be empty")
});

const instructorIdSchema = z.string().uuid().nonempty("courseId cannot be empty");


export {updateUserToInstructorSchema, courseToInstructor, instructorIdSchema}