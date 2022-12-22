import { env } from '$env/dynamic/private'
import { AxiosClient } from '../client-implementation/axios-client'
import type { HttpClientReader } from '../protocols/client'
import type { ResponseHandler } from '../protocols/response'
import type { RequestConfigBuilder } from '../protocols/request'
import { ReaderApiService } from '../reader-api-service'
import { ImplementationRequestConfigBuilder } from '../request-builder/implementation'
import { ResponseHandlerImplementation } from '../response/implementation'
import type { Convert } from '$domain/adapters'

export interface ApiReaderServiceOptions<T> {
  resource: string
  converter: Convert<T>
  baseUrl?: string
  requestBuilder?: RequestConfigBuilder
  client?: HttpClientReader
  responseHandler?: ResponseHandler<T>
}

export const readerServiceFactory = <T>(
  options: ApiReaderServiceOptions<T>
): ReaderApiService<T> => {
  const {
    resource,
    baseUrl = env.BACKEND_URL || '',
    requestBuilder = new ImplementationRequestConfigBuilder({ baseUrl }),
    converter,
    client = new AxiosClient(requestBuilder, '/api/content/'),
    responseHandler = new ResponseHandlerImplementation(converter)
  } = options

  return new ReaderApiService(resource, client, responseHandler)
}
