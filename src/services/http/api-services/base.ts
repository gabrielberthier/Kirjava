import type { HttpClient } from '../protocols/client'
import type { ApiResponse, ResponseHandler } from '../protocols/response'

export abstract class BaseApiService<T> {
  constructor(
    readonly resource: string,
    readonly client: HttpClient,
    readonly responseHandler: ResponseHandler<T>
  ) {}

  protected getUrl(id: string | number = '') {
    return [this.resource, id].filter((el) => el).join('/')
  }

  protected async exec(path: string, params?: any): Promise<ApiResponse<T>> {
    const response = await this.client.dispatch(path, params)

    return this.responseHandler.handle(response)
  }
}
