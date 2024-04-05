import type { IAllPostResponse, IPostResponse } from '$models/post'
import type { Result } from 'neverthrow'

export interface PostFetcher {
  all(
    page?: number,
    limit?: number,
    params?: any
  ): Promise<Result<IAllPostResponse, Error>>
  getOneWithSlug(slug: string, params?: any): Promise<Result<IPostResponse, Error>>
  getArticles(page?: number, limit?: number): Promise<Result<IAllPostResponse, Error>>
}
