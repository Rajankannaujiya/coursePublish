import { z } from "zod";

const Role = z.enum(["USER", "ADMIN", "INSTRUCTOR"]);
const Provider = z.enum(["CREDENTIALS", "GOOGLE", "TWITTER"]);

const BaseProfileSchema = z.object({
  id: z.string().uuid(),
  bio: z.string().optional(),
  imageUrl: z.string().url().optional()
}).nullable();

const BaseCourseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  imageUrl: z.string().url(),
  createdAt: z.date(),
  updatedAt: z.date(),
  enrolledUsers: z.array(
    z.object({
      id: z.string().uuid(),
      email: z.string().email()
    })
  )
});

const BaseUserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().nullable(),
  role: Role,
  provider: Provider.nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  profile: BaseProfileSchema.optional()
});


const InstructorsSchema = z.object({
  id: z.string().uuid(),
  user: BaseUserSchema.required(),
  courses: z.array(BaseCourseSchema).optional(),
  workExp: z.number(),
  profession: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
});


export {
  BaseUserSchema,
  BaseProfileSchema,
  BaseCourseSchema,
  InstructorsSchema,
};