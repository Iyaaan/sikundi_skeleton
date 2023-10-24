import * as z from 'zod'

const verificationSchema = z.object({
    otp: z.string().min(1, 'Otp is required').min(4, 'Otp must have than 4 characters')
})

export type verificationSchemaType = z.infer<typeof verificationSchema>

export default verificationSchema