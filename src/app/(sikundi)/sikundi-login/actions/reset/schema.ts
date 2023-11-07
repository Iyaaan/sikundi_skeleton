import * as z from 'zod'

const resetSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
})

export type resetSchemaType = z.infer<typeof resetSchema>

export default resetSchema