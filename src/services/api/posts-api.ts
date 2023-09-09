import { readerServiceFactory } from '../http/factory/make-service'
import { env } from '$env/dynamic/private'
import { GhostClient } from '$services/http/client-implementation/ghost/ghost-client'
import type { IAllPostResponse } from '$domain/models/post'
import type { IPostResponse } from '$domain/models/post'
import { allPostsConverter, postConverter } from '$domain/model-to-data/posts-data'
import { err, ok, Result } from 'neverthrow'
import type { DomainHttpException } from '$services/http/exceptions/http-exceptions'
import { entrySchema, postSchema } from '../../schemas'
import type { Post, Entry } from '../../schemas'
import type { PostFetcher } from '$lib/data/posts/protocols'

export const AllPostsApi = readerServiceFactory<Entry>({
  resource: 'posts',
  apiPath: 'api/content',
  client: new GhostClient(env.BACKEND_URL || '', false),
  schema: entrySchema
})

export const singlePostApi = readerServiceFactory<Post>({
  resource: 'posts',
  apiPath: 'api/content',
  client: new GhostClient(env.BACKEND_URL || '', true),
  schema: postSchema
})

export class ApiPostsLoader implements PostFetcher {
  async getArticles(
    page?: number | undefined,
    limit?: number | undefined
  ): Promise<Result<IAllPostResponse, DomainHttpException>> {
    const entry = await AllPostsApi.get('', {
      page,
      limit,
      filter: 'tag:article',
      include: 'tags,authors'
    })

    if (entry.success) {
      return ok(allPostsConverter(entry.data))
    }

    return err(entry.error)
  }

  async all(
    page?: number,
    limit?: number,
    params?: any
  ): Promise<Result<IAllPostResponse, DomainHttpException>> {
    params ||= {}
    const entry = await AllPostsApi.get('', { page, limit, ...params })

    if (entry.success) {
      return ok(allPostsConverter(entry.data))
    }

    return err(entry.error)
  }

  async getOneWithSlug(
    slug: string,
    params?: any
  ): Promise<Result<IPostResponse, DomainHttpException>> {
    const response = await singlePostApi.get('', { slug, ...params })

    if (response.success) {
      return ok(postConverter(response.data))
    }

    return err(response.error)
  }
}
