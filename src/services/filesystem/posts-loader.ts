import { browser } from '$app/environment'
import type { Meta } from '$domain/models/meta'
import type { IAllPostResponse, IPostResponse } from '$domain/models/post'
import type { PostFetcher } from '$lib/data/posts/protocols'
import { notFoundError } from '$services/http/exceptions/http-exceptions'
import type { DomainHttpException } from '$services/http/exceptions/http-exceptions'
import { err, ok } from 'neverthrow'
import type { Result } from 'neverthrow'
import { PostsSingleton } from './posts-singleton'

interface FileSystemLoadingOptions {
  page?: number
  limit?: number
}

export class FileSystemPostsLoader implements PostFetcher {
  private postsSingleton: PostsSingleton

  constructor() {
    if (browser) {
      throw new Error(`posts can only be imported server-side`)
    }

    this.postsSingleton = PostsSingleton.getInstance()
  }
  async getArticles(
    page?: number,
    limit?: number
  ): Promise<Result<IAllPostResponse, DomainHttpException>> {
    const result = await this.load({
      page,
      limit
    })

    return ok(result)
  }

  async all(
    page?: number,
    limit?: number,
    params?: any
  ): Promise<Result<IAllPostResponse, DomainHttpException>> {
    const result = await this.load({
      page,
      limit
    })

    return ok(result)
  }

  async getOneWithSlug(slug: string): Promise<Result<IPostResponse, DomainHttpException>> {
    const { post } = await this.findOne(slug)

    if (post) return ok(post)
    else return err(notFoundError('Not found in getOneWithSlug'))
  }

  async load(
    options: FileSystemLoadingOptions = {
      page: 1,
      limit: 15
    }
  ): Promise<IAllPostResponse> {
    const { limit = 15, page = 1 } = options
    const posts = this.postsSingleton.paginate(limit, page)

    return {
      posts,
      meta: this.metaMaker(options)
    }
  }

  metaMaker(
    options: FileSystemLoadingOptions = {
      page: 1,
      limit: 15
    }
  ): Meta {
    const { limit = 15, page = 1 } = options
    const total = this.postsSingleton.posts.length
    const pages = Math.floor(total / limit)
    const next = page < pages ? page + 1 : undefined
    const prev = page >= 1 ? page - 1 : undefined

    return {
      pagination: {
        page,
        limit,
        total,
        pages,
        next,
        prev
      }
    }
  }

  async findOne(slug: string) {
    return {
      post: this.postsSingleton.posts.find((post) => slug === post.slug),
      meta: this.metaMaker()
    }
  }
}
