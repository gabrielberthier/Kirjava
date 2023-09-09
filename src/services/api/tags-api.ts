import { GhostClient } from '$services/http/client-implementation/ghost/ghost-client'
import {
  multiReaderServiceFactory,
  readerServiceFactory
} from '$services/http/factory/make-service'
import { env } from '$env/dynamic/private'
import { tagSchema, entryTagsSchema } from '../../schemas'
import type { TagsEntry } from '../../schemas'

export const multiTagsApi = readerServiceFactory<TagsEntry>({
  resource: 'tags',
  apiPath: 'api/content',
  client: new GhostClient(env.BACKEND_URL || '', false),
  schema: entryTagsSchema
})
