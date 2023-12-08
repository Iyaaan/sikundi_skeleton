import * as z from 'zod'

const AdSchema = z.object({
    id: z.number().optional(),
    altTxt: z.string().min(1, 'Alt Text is required'),
    url: z.string().refine((url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    }, { message: 'Invalid URL format' }).optional(),
    createdBy: z.object({
        value: z.string(),
        label: z.string()
    }),
    createdAt: z.date().optional().or(z.string().optional()),
    adType: z.object({
        value: z.string(),
        label: z.string()
    }).refine((type) => [
        't_banner',
        'ss_banner',
        'ess_banner',
        'ls_banner',
        'ml_banner',
        'msl_banner',
        'ia_banner',
        'ae_banner'
    ].includes(type.value), {
        message: 'type is not valid'
    }),
    adsUrl: z.string().optional(),
    language: z.object({
        value: z.string(),
        label: z.string()
    }).refine((lang) => ['EN', 'DV'].includes(lang.value), {
        message: 'language is not valid'
    }),
    action: z.string().refine((action) => ['draft', 'delete', 'soft_delete', 'publish', 'pending'].includes(action), {
        message: 'Action is not valid'
    }).optional(),
})

export type AdSchemaType = z.infer<typeof AdSchema>

export default AdSchema