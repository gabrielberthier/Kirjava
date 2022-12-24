import { env } from '$env/dynamic/private'
import { AxiosClient } from '../client-implementation/axios-client'
import type { HttpClientReader } from '../protocols/client'
import type { ResponseHandler } from '../protocols/response'
import type { RequestConfigBuilder } from '../protocols/request'
import { ReaderApiService } from '../api-services/reader'
import { ImplementationRequestConfigBuilder } from '../request-builder/implementation'
import { ResponseHandlerImplementation } from '../response/implementation'
import type { Convert } from '$domain/adapters'
import { removeTrailingSlash } from '$services/utils/functions'

export interface ApiReaderServiceOptions<T> {
  resource: string
  converter: Convert<T>
  baseUrl?: string
  apiPath?: string
  requestBuilder?: RequestConfigBuilder
  client?: HttpClientReader
  responseHandler?: ResponseHandler<T>
}

export const readerServiceFactory = <T>(
  options: ApiReaderServiceOptions<T>
): ReaderApiService<T> => {
  let {
    resource,
    converter,
    baseUrl = env.BACKEND_URL || '',
    apiPath = '',
    requestBuilder,
    client,
    responseHandler
  } = options

  resource = removeTrailingSlash(resource)
  baseUrl = removeTrailingSlash(baseUrl)
  apiPath = removeTrailingSlash(apiPath)
  requestBuilder ??= new ImplementationRequestConfigBuilder({ baseUrl })
  client ??= new AxiosClient(requestBuilder, apiPath)
  responseHandler ??= new ResponseHandlerImplementation(converter)

  return new ReaderApiService(resource, client, responseHandler)
}
