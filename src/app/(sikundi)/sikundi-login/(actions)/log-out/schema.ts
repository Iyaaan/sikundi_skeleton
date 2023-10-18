import * as z from 'zod'
const LogOutSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email')
})

export type LogOutSchemaType = z.infer<typeof LogOutSchema>

export default LogOutSchema