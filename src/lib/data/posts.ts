import type { IAllPostResponse, IPostResponse } from '$models/post'
import { FileSystemPostsLoader } from '$services/filesystem/posts-loader'
import { allPostsConverter, postConverter } from '$domain/model-to-data/posts-data'
import { AllPostsApi, singlePostApi } from '$services/api/posts-api'
import { GhostClientSingle } from '$services/http/client-implementation/ghost-client'

// Use a loader factory here to cases 1 - From local .md files and Ghost CMS

const loadURL = async (page?: number, limit?: number) => {
  return await AllPostsApi.get('', { page, limit })
}

export class PostsLoader {
  constructor(private useLocal: boolean = false) {}

  async all(page?: number, limit?: number): Promise<IAllPostResponse> {
    page ??= 1
    limit ??= 10
    if (this.useLocal) {
      return new FileSystemPostsLoader().load({
        page,
        limit
      })
    }

    return allPostsConverter(await loadURL(page, limit))
  }

  async getOneBySlug(slug: string, params?: any): Promise<IPostResponse | undefined> {
    let post: IPostResponse | undefined
    if (this.useLocal) {
      post = (await new FileSystemPostsLoader().findOne(slug)).post
    } else {
      post = postConverter(await singlePostApi.get('', { slug, ...params }))
    }

    return post
  }

  async getArticles(page?: number, limit?: number){
    if (this.useLocal) {
      return new FileSystemPostsLoader().load({
        page,
        limit
      })
    }

    const posts = await AllPostsApi.get('', { page, limit, filter: 'tag:article' })

    return allPostsConverter(posts)
  }
}
