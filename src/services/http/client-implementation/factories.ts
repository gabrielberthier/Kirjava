import { ImplementationRequestConfigBuilder } from '../request-builder/implementation'
import { AxiosClient } from './axios/axios-client'
import { GhostSingleItemClient } from './ghost/single-items-client'
import { env } from '$env/dynamic/private'
import { GhostMultiItemsClient } from './ghost/multi-items-client'

export const axiosImplementation = (baseUrl: string, apiPath?: string, headers?: any) => {
  const requestBuilder = new ImplementationRequestConfigBuilder({ baseUrl, headers })

  return new AxiosClient(requestBuilder, apiPath)
}

export const ghostImplementation = (singleItem: boolean) => {
  const backendUrl = env.BACKEND_URL ?? 'https://site.com'
  const key = env.KEY ?? (Math.random() + 1).toString(36).substring(26)
  if (singleItem) {
    return new GhostSingleItemClient(backendUrl + 'api/content', key)
  }

  return new GhostMultiItemsClient(backendUrl, key)
}

