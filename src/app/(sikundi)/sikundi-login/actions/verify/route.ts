import * as z from 'zod'

export const verificationSchema = z.object({
    otp: z.string().min(1, 'Otp is required').min(4, 'Otp must have than 4 characters')
})
export async function verify(formData: FormData) {
    return {
        error: {
            title: "Auth error",
            description: "Please try again in a few minutes"
        }
    }
}
export type verificationSchemaType = z.infer<typeof verificationSchema>