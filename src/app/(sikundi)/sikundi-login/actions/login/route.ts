import * as z from 'zod'

export const LogInSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z.string().min(1, 'Password is required').min(8, 'Password must have than 8 characters')
})
export async function POST(request: Request) {
    return {
        error: {
            title: "Auth error",
            description: "Please try again in a few minutes"
        }
    }
}

export type LogInSchemaType = z.infer<typeof LogInSchema>