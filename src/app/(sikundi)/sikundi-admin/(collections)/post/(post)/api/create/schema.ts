import * as z from 'zod'
const PostSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    longTitle: z.string().optional(),
    description: z.string().optional(),
    lead: z.string().optional(),
    createdBy: z.string().optional(),
    createdAt: z.date().optional(),
    category: z.string().optional(),
    featureImageUrl: z.string().optional(),
    status: z.string().refine((status) => ['drafted', 'published', 'soft_deleted', 'pending'].includes(status), {
        message: 'Status is not valid'
    }),
    tags: z.string().array().optional()
})

export type PostSchemaType = z.infer<typeof PostSchema>

export default PostSchema