import { Entry } from '$domain/models/posts-entry'
import { readerServiceFactory } from '../http/factory/make-service'
import { env } from '$env/dynamic/private'
import { GhostClient, GhostClientSingle } from '$services/http/client-implementation/ghost-client'
import { Post } from '$domain/models/post'
import type { IAllPostResponse } from '$domain/models/post'
import type { IPostResponse } from '$domain/models/post'
import type { PostFetcher } from '$lib/data/posts'
import { allPostsConverter, postConverter } from '$domain/model-to-data/posts-data'

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

export class ApiPostsLoader implements PostFetcher {
  async getArticles(
    page?: number | undefined,
    limit?: number | undefined
  ): Promise<IAllPostResponse> {
    const posts = await AllPostsApi.get('', { page, limit, filter: 'tag:article' })

    return allPostsConverter(posts)
  }

  async all(page?: number | undefined, limit?: number | undefined): Promise<IAllPostResponse> {
    const entry = await this.loadURL(page, limit)

    return allPostsConverter(entry)
  }

  async getOneWithSlug(slug: string, params?: any): Promise<IPostResponse | undefined> {
    const post = await singlePostApi.get('', { slug, ...params })

    return postConverter(post)
  }

  async loadURL(page?: number, limit?: number): Promise<Entry> {
    return AllPostsApi.get('', { page, limit })
  }
}
