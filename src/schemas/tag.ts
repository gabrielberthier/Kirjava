import { z } from 'zod'

export const tagSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  url: z.string().optional(),
  visibility: z.string().optional(),
  description: z.string().optional().nullable(),
  featureImage: z.string().optional().nullable(),
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable()
})
