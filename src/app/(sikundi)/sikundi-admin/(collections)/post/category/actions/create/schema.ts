import * as z from 'zod'
const CategorySchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'),
    description: z.string().optional(),
    createdBy: z.object({
        value: z.string(),
        label: z.string()
    }),
    createdAt: z.date().optional().or(z.string().optional()),
    action: z.string().refine((action) => ['update', 'create', 'delete'].includes(action), {
        message: 'Action is not valid'
    }),
})

export type CategorySchemaType = z.infer<typeof CategorySchema>

export default CategorySchema