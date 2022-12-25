import { Entry } from '$domain/models/posts-entry'
import { readerServiceFactory } from '../http/factory/make-service'
import { env } from '$env/dynamic/private'
import { GhostClient, GhostClientSingle } from '$services/http/client-implementation/ghost-client'
import { Post } from '$domain/models/post'

export const AllPostsApi = readerServiceFactory<Entry>({
  resource: 'posts',
  apiPath: 'api/content',
  client: new GhostClient(env.BACKEND_URL || ''),
  entity: Entry
})

export const singlePostApi = readerServiceFactory<Post>({
  resource: 'posts',
  apiPath: 'api/content',
  client: new GhostClientSingle(env.BACKEND_URL || ''),
  entity: Post
})
