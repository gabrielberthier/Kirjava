import type { HttpMethod, Params, ProxyConfig } from './client'

export type RequestConfig = {
  method: HttpMethod
  url: string
  headers: any
  httpsAgent?: any
  data?: any
  proxy?: ProxyConfig
}

export interface RequestConfigBuilder {
  build: (
    method: HttpMethod,
    path: string,
    params: Params | FormData,
    options?: { responseType: 'arraybuffer' }
  ) => Promise<RequestConfig>
}
