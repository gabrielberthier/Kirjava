import { PostsEntryAdapter } from '$domain/adapters'
import type { Entry } from '$domain/models/posts-entry'
import { readerServiceFactory } from '../http/factory/make-service'

export const AllPostsApi = readerServiceFactory<Entry>({
  resource: 'posts',
  apiPath: 'api/content',
  converter: new PostsEntryAdapter()
})
