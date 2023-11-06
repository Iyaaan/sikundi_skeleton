import * as z from 'zod'
const CategorySchema = z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'),
    createdBy: z.object({
        value: z.string(),
        label: z.string()
    }),
    createdAt: z.date().optional()
})

export type CategorySchemaType = z.infer<typeof CategorySchema>

export default CategorySchema