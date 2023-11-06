import * as z from 'zod'
const TagSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'),
    createdBy: z.string().optional(),
    createdAt: z.date().optional()
})

export type TagSchemaType = z.infer<typeof TagSchema>

export default TagSchema