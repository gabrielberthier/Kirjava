import { z } from 'zod'

export const authorSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  bio: z.string().optional(),
  website: z.string().optional(),
  url: z.string().optional(),
  profileImage: z.string().optional().nullable(),
  coverImage: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  facebook: z.string().optional().nullable(),
  twitter: z.string().optional().nullable(),
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable()
})
