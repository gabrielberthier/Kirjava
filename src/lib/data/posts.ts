import type { IAllPostResponse, IPostResponse } from '$models/post'

export interface PostFetcher {
  all(page?: number, limit?: number): Promise<IAllPostResponse>
  getOneWithSlug(slug: string, params?: any): Promise<IPostResponse | undefined>
  getArticles(page?: number, limit?: number): Promise<IAllPostResponse>
}

export class PostsDataProvider {
  constructor(private postFetcher: PostFetcher) {}

  async all(page?: number, limit?: number): Promise<IAllPostResponse> {
    page ??= 1
    limit ??= 10

    return this.postFetcher.all(page, limit)
  }

  async getOneBySlug(slug: string, params?: any): Promise<IPostResponse | undefined> {
    return this.postFetcher.getOneWithSlug(slug, params)
  }

  async getArticles(page?: number, limit?: number) {
    return this.postFetcher.getArticles(page, limit)
  }
}
