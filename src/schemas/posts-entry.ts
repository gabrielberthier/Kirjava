import { z } from 'zod'
import { metaSchema } from './pagination'
import { postSchema } from './post'

export const entrySchema = z.object({
  posts: z.array(postSchema),
  meta: metaSchema
})

export type Entry = z.infer<typeof entrySchema>