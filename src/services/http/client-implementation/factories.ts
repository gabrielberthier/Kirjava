import { ImplementationRequestConfigBuilder } from '../request-builder/implementation'
import { AxiosClient } from './axios-client'

export const axiosImplementation = (baseUrl: string, apiPath?: string) => {
  const requestBuilder = new ImplementationRequestConfigBuilder({ baseUrl })
  return new AxiosClient(requestBuilder, apiPath)
}
