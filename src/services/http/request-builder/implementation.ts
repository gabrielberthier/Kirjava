import type { HttpMethod, Params, ProxyConfig } from '../protocols/client'
import type { RequestConfig, RequestConfigBuilder } from '../protocols/request'
import { stringify } from 'qs'

type Data = Params | FormData

const THRESHOLD_AVOID_REQUEST_URL_TOO_LARGE = 4096

export class ImplementationRequestConfigBuilder implements RequestConfigBuilder {
  private baseUrl: string
  private headers: any
  private proxy?: ProxyConfig

  constructor({ baseUrl, proxy }: { baseUrl: string; proxy?: ProxyConfig }) {
    this.baseUrl = baseUrl
    this.proxy = proxy
  }

  public async build(
    method: HttpMethod,
    path: string,
    params: Data,
    options?: { responseType: 'arraybuffer' }
  ) {
    const requestConfig: RequestConfig = {
      method,
      headers: this.headers,
      url: `${this.baseUrl}${path}`,
      ...(options ? options : {}),
      proxy: this.proxy
    }

    switch (method) {
      case 'get': {
        const requestUrl = this.buildRequestUrl(path, params)
        if (requestUrl.length > THRESHOLD_AVOID_REQUEST_URL_TOO_LARGE) {
          return {
            ...requestConfig,
            method: 'post' as const,
            headers: { ...this.headers, 'X-HTTP-Method-Override': 'GET' },
            data: await this.buildData(params)
          }
        }
        return {
          ...requestConfig,
          url: requestUrl
        }
      }
      case 'post': {
        if (params instanceof FormData) {
          const formData = await this.buildData(params)
          return {
            ...requestConfig,
            headers: this.headers,
            data: formData
          }
        }
        return {
          ...requestConfig,
          data: await this.buildData(params)
        }
      }
      case 'put': {
        return {
          ...requestConfig,
          data: await this.buildData(params)
        }
      }
      case 'delete': {
        const requestUrl = this.buildRequestUrl(path, await this.buildData(params))
        return {
          ...requestConfig,
          url: requestUrl
        }
      }
      default: {
        throw new Error(`${method} method is not supported`)
      }
    }
  }

  private async buildData<T extends Data>(params: T): Promise<T> {
    return params
  }

  private buildRequestUrl(path: string, params: Data): string {
    return `${this.baseUrl}${path}?${stringify(params)}`
  }
}
