import { z } from 'zod'

export const authorSchema = z.object({
  id: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  slug: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
  profileImage: z.string().optional().nullable(),
  coverImage: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  facebook: z.string().optional().nullable(),
  twitter: z.string().optional().nullable(),
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable()
})
