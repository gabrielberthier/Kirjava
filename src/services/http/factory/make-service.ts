import { env } from '$env/dynamic/private'
import type { JsonClientReader } from '../protocols/client'
import type { ResponseHandler } from '../protocols/response'
import { ReaderApiService } from '../api-services/reader'
import type { Constructor, Convert } from '$domain/adapters'
import { removeTrailingSlash } from '$services/utils/functions'
import { axiosImplementation } from '../client-implementation/factories'
import { makeDefaultResponseHandler, makeDefaultResponseHandlerMany } from '../response/factories'

export interface ApiReaderServiceOptions<T extends object> {
  resource: string
  entity: Constructor<T>
  baseUrl?: string
  apiPath?: string
  client?: JsonClientReader
  headers?: any
}

export interface SingleItemApiReaderServiceOptions<T extends object>
  extends ApiReaderServiceOptions<T> {
  responseHandler?: ResponseHandler<T>
}

export interface MultiItemApiReaderServiceOptions<T extends object>
  extends ApiReaderServiceOptions<T> {
  responseHandler?: ResponseHandler<T[]>
}

export const readerServiceFactory = <T extends object>(
  options: SingleItemApiReaderServiceOptions<T>
): ReaderApiService<T> => {
  let {
    resource,
    entity,
    baseUrl = env.BACKEND_URL || '',
    apiPath = '',
    client,
    responseHandler,
    headers
  } = options

  resource = removeTrailingSlash(resource)
  baseUrl = removeTrailingSlash(baseUrl)
  apiPath = removeTrailingSlash(apiPath)
  client ??= axiosImplementation(baseUrl, apiPath, headers)
  responseHandler ??= makeDefaultResponseHandler(entity)

  return new ReaderApiService(resource, client, responseHandler)
}

export const multiReaderServiceFactory = <T extends object>(
  options: MultiItemApiReaderServiceOptions<T>
): ReaderApiService<T[]> => {
  let {
    resource,
    entity,
    baseUrl = env.BACKEND_URL || '',
    apiPath = '',
    client,
    responseHandler,
    headers,
  } = options

  resource = removeTrailingSlash(resource)
  baseUrl = removeTrailingSlash(baseUrl)
  apiPath = removeTrailingSlash(apiPath)
  client ??= axiosImplementation(baseUrl, apiPath, headers)
  responseHandler ??= makeDefaultResponseHandlerMany(entity,)

  return new ReaderApiService(resource, client, responseHandler)
}
