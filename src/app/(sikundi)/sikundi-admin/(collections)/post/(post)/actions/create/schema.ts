import * as z from 'zod'
const PostSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(1, 'Title is required'),
    longTitle: z.string().optional(),
    latinTitle: z.string().optional(),
    description: z.string().optional(),
    lead: z.string().optional(),
    createdBy: z.object({
        value: z.string(),
        label: z.string()
    }),
    createdAt: z.date().optional().or(z.string().optional()),
    category: z.object({
        value: z.string(),
        label: z.string()
    }).optional(),
    featureImageUrl: z.string().optional(),
    featureImageCaption: z.string().optional(),
    language: z.object({
        value: z.string(),
        label: z.string()
    }).refine((lang) => ['EN', 'DV'].includes(lang.value), {
        message: 'language is not valid'
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
    }).optional(),
    action: z.string().refine((action) => ['draft', 'delete', 'soft_delete', 'publish', 'pending'].includes(action), {
        message: 'Action is not valid'
    }).optional(),
    breaking: z.boolean().optional(),
    liveblog: z.boolean().optional()
})

export type PostSchemaType = z.infer<typeof PostSchema>

export default PostSchema