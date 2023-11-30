import * as z from 'zod'
const LogInSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z.string().min(1, 'Password is required').min(8, 'Password must have than 8 characters')
})

export type LogInSchemaType = z.infer<typeof LogInSchema>

export default LogInSchema