import * as z from 'zod'
const LogOutSchema = z.object({
    
})

export type LogOutSchemaType = z.infer<typeof LogOutSchema>

export default LogOutSchema