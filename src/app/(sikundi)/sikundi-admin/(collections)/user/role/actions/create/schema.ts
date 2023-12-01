import * as z from 'zod'
const RoleSchema = z.object({
    id: z.number().optional(),
    name: z.string().optional(),
    createdBy: z.object({
        value: z.string(),
        label: z.string()
    }).optional(),
    Permissions: z.array(z.object({
        table: z.string(),
        actions: z.array(z.string())
    })),
    createdAt: z.date().optional().or(z.string().optional()),
    action: z.string().refine((action) => ['active', 'blocked'].includes(action), {
        message: 'Action is not valid'
    }).optional(),
})

export type RoleSchemaType = z.infer<typeof RoleSchema>

export default RoleSchema