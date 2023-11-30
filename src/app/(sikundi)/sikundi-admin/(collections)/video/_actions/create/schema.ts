import * as z from 'zod'
const VideoSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(1, 'Title is required'),
    longTitle: z.string().optional(),
    latinTitle: z.string().optional(),
    description: z.string().optional(),
    createdBy: z.object({
        value: z.string(),
        label: z.string()
    }),
    createdAt: z.date().optional().or(z.string().optional()),
    YoutubeUrl: z.string().regex(/^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/),
    language: z.object({
        value: z.string(),
        label: z.string()
    }).refine((lang) => ['EN', 'DV'].includes(lang.value), {
        message: 'language is not valid'
    }),
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
})

export type VideoSchemaType = z.infer<typeof VideoSchema>

export default VideoSchema