import { z } from 'zod'

export const tagSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  slug: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
  visibility: z.string().optional(),
  description: z.string().optional().nullable(),
  featureImage: z.string().optional().nullable(),
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable()
})
