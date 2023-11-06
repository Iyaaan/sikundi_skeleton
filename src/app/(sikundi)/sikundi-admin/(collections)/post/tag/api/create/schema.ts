import * as z from 'zod'
const TagSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'),
    createdBy: z.object({
        value: z.string(),
        label: z.string()
    }),
    createdAt: z.date().optional().or(z.string().optional())
})

export type TagSchemaType = z.infer<typeof TagSchema>

export default TagSchema