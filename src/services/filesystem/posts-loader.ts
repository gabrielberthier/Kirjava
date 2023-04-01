import { browser } from '$app/environment'
import type { Meta } from '$domain/models/meta'
import type { IAllPostResponse, IPostResponse } from '$domain/models/post'
import type { PostFetcher } from '$lib/data/posts'
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
    page?: number | undefined,
    limit?: number | undefined
  ): Promise<Partial<{ posts: IPostResponse[]; meta: Meta }>> {
    return this.load({
      page,
      limit
    })
  }

  async all(page?: number, limit?: number): Promise<Partial<IAllPostResponse>> {
    return this.load({
      page,
      limit
    })
  }

  async getOneWithSlug(slug: string, _params?: any): Promise<IPostResponse | undefined> {
    const { post } = await this.findOne(slug)

    return post
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
