import * as z from 'zod'
const UserSchema = z.object({
    id: z.number().optional(),
    userName: z.string(),
    userNameEn: z.string(),
    email: z.string().email(),
    password: z.string().optional(),
    description: z.string().optional(),
    createdBy: z.object({
        value: z.string(),
        label: z.string()
    }).optional(),
    role: z.object({
        value: z.string(),
        label: z.string()
    }).optional(),
    createdAt: z.date().optional().or(z.string().optional()),
    profilePictureUrl: z.string().optional(),
    action: z.string().refine((action) => ['active', 'blocked'].includes(action), {
        message: 'Action is not valid'
    }).optional(),
})

export type UserSchemaType = z.infer<typeof UserSchema>

export default UserSchema