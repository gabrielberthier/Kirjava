import type { JsonClientReader } from '../protocols/client'
import type { ResponseHandler } from '../protocols/response'
import { ReaderApiService } from '../api-services/reader'
import { removeTrailingSlash } from '$services/utils/string-belt'
import { axiosImplementation } from '../client-implementation/factories'
import { makeDefaultResponseHandler } from '../response/factories'
import { env } from '$env/dynamic/private'
import type { AnyZodObject } from 'zod'
import { MultiItemConverter, SingleItemConverter } from '$domain/adapters'

export interface ApiReaderServiceOptions<T extends object> {
  resource: string
  schema: AnyZodObject
  responseHandler?: ResponseHandler<T>
  baseUrl?: string
  apiPath?: string
  client?: JsonClientReader
  headers?: any
}

export const readerServiceFactory = <T extends object>(
  options: ApiReaderServiceOptions<T>
): ReaderApiService<T> => {
  let {
    resource,
    schema,
    baseUrl = env.BACKEND_URL || '',
    apiPath = '',
    client,
    responseHandler,
    headers
  } = options

  const [res = '', url = '', path = ''] = [resource, baseUrl, apiPath].map((el) =>
    removeTrailingSlash(el)
  )

  client ??= axiosImplementation(url, path, headers)
  responseHandler ??= makeDefaultResponseHandler<T>(new SingleItemConverter(schema))

  return new ReaderApiService(res, client, responseHandler)
}

export const multiReaderServiceFactory = <T extends Array<{}>>(
  options: ApiReaderServiceOptions<T>
): ReaderApiService<T> => {
  let {
    resource,
    schema,
    baseUrl = env.BACKEND_URL || '',
    apiPath = '',
    client,
    responseHandler,
    headers
  } = options

  const [res = '', url = '', path = ''] = [resource, baseUrl, apiPath].map((el) =>
    removeTrailingSlash(el)
  )

  client ??= axiosImplementation(url, path, headers)
  responseHandler ??= makeDefaultResponseHandler<T>(new MultiItemConverter(schema))

  return new ReaderApiService(res, client, responseHandler)
}