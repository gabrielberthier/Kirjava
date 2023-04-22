import type { Convert } from '$domain/adapters'
import type { RawApiResponse } from '../protocols/client'
import type { ApiResponse, ResponseHandler } from '../protocols/response'
import { errorFor, success } from './response-forge'

export class ResponseHandlerImplementation<T> implements ResponseHandler {
  /**
   *
   */
  constructor(readonly converter: Convert<T>) {}

  async handle(response: RawApiResponse): Promise<ApiResponse<T>> {
    const { data, headers, status, error } = response

    if (error) {
      return errorFor(error, status, headers)
    }

    let values = this.converter.parseEntity(data)

    return success(status, values, headers)
  }
}
