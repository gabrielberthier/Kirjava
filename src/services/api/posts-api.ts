import { PostsEntryAdapter } from '$domain/adapters'
import type { Entry } from '$domain/adapters'
import { readerServiceFactory } from '../http/factory/make-service'

export const AllPostsApi = readerServiceFactory<Entry>({
  resource: 'posts',
  converter: new PostsEntryAdapter()
})
