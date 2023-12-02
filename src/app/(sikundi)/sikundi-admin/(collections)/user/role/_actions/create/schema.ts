import * as z from 'zod'
const RoleSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, 'name is required'),
    createdBy: z.object({
        value: z.string(),
        label: z.string()
    }),
    permissions: z.object({
        post: z.array(z.object({
            value: z.string(),
            label: z.string()
        })).optional(),
        category: z.array(z.object({
            value: z.string(),
            label: z.string()
        })).optional(),
        tag: z.array(z.object({
            value: z.string(),
            label: z.string()
        })).optional(),
        library: z.array(z.object({
            value: z.string(),
            label: z.string()
        })).optional(),
        graphic: z.array(z.object({
            value: z.string(),
            label: z.string()
        })).optional(),
        photo: z.array(z.object({
            value: z.string(),
            label: z.string()
        })).optional(),
        video: z.array(z.object({
            value: z.string(),
            label: z.string()
        })).optional(),
        user: z.array(z.object({
            value: z.string(),
            label: z.string()
        })).optional(),
        role: z.array(z.object({
            value: z.string(),
            label: z.string()
        })).optional()
    }),
    createdAt: z.date().optional().or(z.string().optional()),
    action: z.string().refine((action) => ['create', 'update', 'delete'].includes(action), {
        message: 'Action is not valid'
    }).optional(),
})

export type RoleSchemaType = z.infer<typeof RoleSchema>

export default RoleSchema