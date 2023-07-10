import { z } from 'zod'
import { tagSchema } from './tag'
import { authorSchema } from './author'

export const postSchema = z.object({
  slug: z.string().optional(),
  id: z.string().optional(),
  uuid: z.string().optional(),
  title: z.string().optional(),
  html: z.string().optional(),
  commentID: z.string().optional(),
  feature_image: z.string().optional().nullable(),
  featureImageAlt: z.string().optional().nullable(),
  feature_image_caption: z.string().optional().nullable(),
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
  ogImage: z.string().optional().nullable(),
  codeinjectionHead: z.string().optional().nullable(),
  codeinjectionFoot: z.string().optional().nullable(),
  ogTitle: z.string().optional().nullable(),
  ogDescription: z.string().optional().nullable(),
  twitterTitle: z.string().optional().nullable(),
  twitterImage: z.string().optional().nullable(),
  twitterDescription: z.string().optional().nullable(),
  customTemplate: z.string().optional().nullable(),
  canonicalURL: z.string().optional().nullable(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  publishedAt: z.string().optional(),
  customExcerpt: z.string().optional().nullable(),
  url: z.string().optional(),
  excerpt: z.string().optional(),
  featured: z.boolean().optional(),
  authors: z.array(authorSchema).optional(),
  tags: z.array(tagSchema).optional(),
  primaryAuthor: authorSchema.optional().nullable(),
  primaryTag: tagSchema.optional().nullable()
})

export type Post = z.infer<typeof postSchema>
