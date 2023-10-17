import * as z from 'zod'

export const resetSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email')
})
export async function reset(formData: FormData) {
    return {
        error: {
            title: "Auth error",
            description: "Please try again in a few minutes"
        }
    }
}
export type resetSchemaType = z.infer<typeof resetSchema>