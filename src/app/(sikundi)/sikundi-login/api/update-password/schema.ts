import * as z from 'zod'

const updatePasswordSchema = z.object({
    password: z.string().min(1, 'Password is required').min(8, 'Password must have than 8 characters'),
    confirm_password: z.string().min(1, 'Password is required').min(8, 'Password must have than 8 characters')
})


export type updatePasswordSchemaType = z.infer<typeof updatePasswordSchema>

export default updatePasswordSchema