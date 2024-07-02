import type { HttpClient } from '../protocols/client'
import type { ApiResponse, ResponseHandler } from '../protocols/response'

export abstract class BaseApiService<T> {
  constructor(
    readonly client: HttpClient,
    readonly responseHandler: ResponseHandler<T>
  ) {}

  protected async exec(path: string, params?: any): Promise<ApiResponse<T>> {
    const response = await this.client.dispatch(path, params)

    if (response.error) {
      console.error('An error occured')
      console.error(response.error.cause)
      console.error('\x1b[31m%s\x1b[0m', response.error)
      console.error('\x1b[31m%s\x1b[0m', response.status)
      console.error('\x1b[31m%s\x1b[0m', response.error.stack)
    }

    return this.responseHandler.handle(response)
  }
}
