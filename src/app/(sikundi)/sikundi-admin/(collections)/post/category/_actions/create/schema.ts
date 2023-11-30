import * as z from 'zod'
const CategorySchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'),
    description: z.string().optional(),
    icon: z.string().min(1, 'icon is required').regex(
        /^<svg .+<\/svg>$/, 
        'Invalid SVG'
    ),
    createdBy: z.object({
        value: z.string(),
        label: z.string()
    }),
    language: z.object({
        value: z.string(),
        label: z.string()
    }).refine((lang) => ['EN', 'DV'].includes(lang.value), {
        message: 'language is not valid'
    }),
    createdAt: z.date().optional().or(z.string().optional()),
    action: z.string().refine((action) => ['update', 'create', 'delete'].includes(action), {
        message: 'Action is not valid'
    }),
})

export type CategorySchemaType = z.infer<typeof CategorySchema>

export default CategorySchema