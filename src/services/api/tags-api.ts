import { env } from '$env/dynamic/private'
import { GhostMultiItemsClient } from '$services/http/client-implementation/ghost/multi-items-client'
import { GhostSingleItemClient } from '$services/http/client-implementation/ghost/single-items-client'
import { readerServiceFactory } from '$services/http/factory/make-service'
import { entryTagsSchema } from '../../schemas'
import type { TagsEntry } from '../../schemas'

const ghostImplementation = (singleItem: boolean) => {
  const backendUrl = env.BACKEND_URL ?? 'https://site.com'
  const key = env.KEY ?? (Math.random() + 1).toString(36).substring(26)
  if (singleItem) {
    return new GhostSingleItemClient(backendUrl, key)
  }

  return new GhostMultiItemsClient(backendUrl, key)
}

export const multiTagsApi = readerServiceFactory<TagsEntry>({
  client: ghostImplementation(false),
  schema: entryTagsSchema
})
