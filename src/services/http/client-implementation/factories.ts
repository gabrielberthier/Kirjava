import { ImplementationRequestConfigBuilder } from '../request-builder/implementation'
import { AxiosClient } from './axios-client'

export const axiosImplementation = (baseUrl: string, apiPath?: string, headers?: any) => {
  const requestBuilder = new ImplementationRequestConfigBuilder({ baseUrl, headers })

  return new AxiosClient(requestBuilder, apiPath)
}
