import { browser } from '$app/environment'
import type { Meta } from '$domain/models/meta'
import type { IAllPostResponse } from '$domain/models/post'
import { PostsSingleton } from './posts-singleton'

interface FileSystemLoadingOptions {
  page?: number
  limit?: number
}

export class FileSystemPostsLoader {
  private postsSingleton: PostsSingleton

  constructor() {
    this.postsSingleton = PostsSingleton.getInstance()

    if (browser) {
      throw new Error(`posts can only be imported server-side`)
    }
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
