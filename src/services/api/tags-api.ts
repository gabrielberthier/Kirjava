import { GhostClient } from '$services/http/client-implementation/ghost/ghost-client'
import { readerServiceFactory } from '$services/http/factory/make-service'
import { entryTagsSchema } from '../../schemas'
import type { TagsEntry } from '../../schemas'

export const multiTagsApi = readerServiceFactory<TagsEntry>({
  resource: 'tags',
  apiPath: 'api/content',
  client: new GhostClient(false),
  schema: entryTagsSchema
})
