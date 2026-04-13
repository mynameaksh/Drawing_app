import z from "zod";

export const CreatedUserSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(4),
    name: z.string().min(4)
})

export const SigninSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(4)
})

export const CreateRoomSchema = z.object({
    name: z.string().max(5)
})