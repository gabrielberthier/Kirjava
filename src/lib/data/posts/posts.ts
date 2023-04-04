import type { PostFetcher } from './protocols'

export class PostsDataProvider {
  constructor(private postFetcher: PostFetcher) {}

  async all(page?: number, limit?: number) {
    page ??= 1
    limit ??= 10

    return this.postFetcher.all(page, limit)
  }

  async getOneBySlug(slug: string, params?: any) {
    return this.postFetcher.getOneWithSlug(slug, params)
  }

  async getArticles(page?: number, limit?: number) {
    return this.postFetcher.getArticles(page, limit)
  }
}
