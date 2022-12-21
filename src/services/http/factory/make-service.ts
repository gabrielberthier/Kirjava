import { env } from '$env/dynamic/private'
import { AxiosClient } from '../client-implementation/axios-client'
import type { HttpClientReader } from '../protocols/client'
import type { ResponseHandler } from '../protocols/response'
import type { RequestConfigBuilder } from '../protocols/request'
import { ReaderApiService } from '../reader-api-service'
import { ImplementationRequestConfigBuilder } from '../request-builder/implementation'
import { ResponseHandlerImplementation } from '../response/implementation'
import type { Convert } from '$domain/adapters'

export const readerServiceFactory = <T>(
  resource: string,
  converter: Convert<T>,
  requestBuilder?: RequestConfigBuilder,
  client?: HttpClientReader,
  responseHandler?: ResponseHandler<T>
): ReaderApiService<T> => {
  const baseUrl = env.BACKEND_URL || ''
  const rb = requestBuilder ?? new ImplementationRequestConfigBuilder({ baseUrl })
  const cl = client ?? new AxiosClient(rb, '/api/content/')
  const rh = responseHandler ?? new ResponseHandlerImplementation(converter)

  return new ReaderApiService(resource, cl, rh)
}
