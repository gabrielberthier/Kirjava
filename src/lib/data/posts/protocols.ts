import type { IAllPostResponse, IPostResponse } from '$models/post'
import type { DomainHttpException } from '$services/http/exceptions/http-exceptions'
import type { Result } from 'neverthrow'

export interface PostFetcher {
  all(
    page?: number,
    limit?: number,
    params?: any
  ): Promise<Result<IAllPostResponse, DomainHttpException>>
  getOneWithSlug(slug: string, params?: any): Promise<Result<IPostResponse, DomainHttpException>>
  getArticles(page?: number, limit?: number): Promise<Result<IAllPostResponse, DomainHttpException>>
}
