import * as z from 'zod'

export const updatePasswordSchema = z.object({
    password: z.string().min(1, 'Password is required').min(8, 'Password must have than 8 characters'),
    confirm_password: z.string().min(1, 'Password is required').min(8, 'Password must have than 8 characters')
})
export async function updatePassword(formData: FormData) {
    return {
        error: {
            title: "Auth error",
            description: "Please try again in a few minutes"
        }
    }
}
export type updatePasswordSchemaType = z.infer<typeof updatePasswordSchema>