import * as z from 'zod'
const PostSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    longTitle: z.string().optional(),
    latinTitle: z.string().optional(),
    description: z.string().optional(),
    lead: z.string().optional(),
    createdBy: z.object({
        value: z.string(),
        label: z.string()
    }),
    createdAt: z.date().optional(),
    category: z.object({
        value: z.string(),
        label: z.string()
    }).optional(),
    featureImageUrl: z.string().optional(),
    status: z.string().refine((status) => ['drafted', 'published', 'soft_deleted', 'pending'].includes(status), {
        message: 'Status is not valid'
    }),
    tags: z.object({
        value: z.string(),
        label: z.string()
    }).array().optional(),
    push: z.object({
        all: z.boolean().optional(),
        facebook: z.boolean().optional(),
        telegram: z.boolean().optional(),
        viber: z.boolean().optional(),
        x: z.boolean().optional(),
        firebase: z.boolean().optional()
    })
})

export type PostSchemaType = z.infer<typeof PostSchema>

export default PostSchema