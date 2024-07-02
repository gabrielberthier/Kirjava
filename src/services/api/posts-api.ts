import { readerServiceFactory } from '../http/factory/make-service'
import type { IAllPostResponse, IPostResponse } from '$domain/models/post'
import { allPostsConverter, postConverter } from '$domain/model-to-data/posts-data'
import { err, ok, Result } from 'neverthrow'
import { entrySchema, postSchema } from '../../schemas'
import type { Post, Entry } from '../../schemas'
import type { PostFetcher } from '$lib/data/posts/protocols'
import type { DomainHttpException } from '$services/http/exceptions/http-exceptions'
import { GhostSingleItemClient } from '$services/http/client-implementation/ghost/single-items-client'
import { GhostMultiItemsClient } from '$services/http/client-implementation/ghost/multi-items-client'
import { env } from '$env/dynamic/private'

const ghostImplementation = (singleItem: boolean) => {
  const backendUrl = env.BACKEND_URL ?? 'https://site.com'
  const key = env.KEY ?? (Math.random() + 1).toString(36).substring(26)
  if (singleItem) {
    return new GhostSingleItemClient(backendUrl, key)
  }

  return new GhostMultiItemsClient(backendUrl, key)
}

export class ApiPostsLoader implements PostFetcher {
  async getArticles(
    page?: number | undefined,
    limit?: number | undefined
  ): Promise<Result<IAllPostResponse, DomainHttpException>> {
    const allPostsApi = readerServiceFactory<Entry>({
      client: ghostImplementation(false),
      schema: entrySchema
    })
    const entry = await allPostsApi.get('posts', {
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
    const allPostsApi = readerServiceFactory<Entry>({
      client: ghostImplementation(false),
      schema: entrySchema
    })
    const entry = await allPostsApi.get('posts', { page, limit, ...params })

    if (entry.success) {
      return ok(allPostsConverter(entry.data))
    }

    return err(entry.error)
  }

  async getOneWithSlug(
    slug: string,
    params?: any
  ): Promise<Result<IPostResponse, DomainHttpException>> {
    const singlePostApi = readerServiceFactory<Post>({
      client: ghostImplementation(true),
      schema: postSchema
    })
    const response = await singlePostApi.get('posts', { slug, ...params })

    if (response.success) {
      return ok(postConverter(response.data))
    }

    return err(response.error)
  }
}
