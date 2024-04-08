import type { Converter } from '$domain/adapters'
import type { RawApiResponse } from '../protocols/client'
import type { ApiResponse, ResponseHandler } from '../protocols/response'
import { errorFor, success, unprocessableEntity } from './response-forge'

export class ResponseHandlerImplementation<T> implements ResponseHandler {
  constructor(readonly converter: Converter<T>) {}

  async handle(response: RawApiResponse): Promise<ApiResponse<T>> {
    const { data, headers, status, error } = response

    if (error) {
      console.error('\x1b[31m%s\x1b[0m', error)
      return errorFor(error, status, headers)
    }

    const values = this.converter.parseEntity(data)

    if (values instanceof Error) {
      console.error('\x1b[31m%s\x1b[0m', values)
      console.error('\x1b[31m%s\x1b[0m', values.stack)

      return unprocessableEntity(values, headers)
    }

    return success(status, values, headers)
  }
}
