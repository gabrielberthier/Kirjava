import type { JsonClientReader, RawApiResponse } from '../../protocols/client'
import type { RequestConfigBuilder, RequestConfig } from '../../protocols/request'
import { ApiErrorResponse } from '../../protocols/errors'
import { isObject } from '$services/utils/is'

interface Fetcher{
  fetch: (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>
}

export class FetchClient implements JsonClientReader {
  constructor(
    private fetcher: Fetcher,
    private requestConfigBuilder: RequestConfigBuilder
  ) {}

  public async get(path: string, params: any) {
    const requestConfig = await this.requestConfigBuilder.build('get', path, params)

    return this.sendRequest(requestConfig)
  }

  dispatch(path: string, params: object) {
    return this.get(path, params)
  }

  private async sendRequest(requestConfig: RequestConfig): Promise<RawApiResponse> {
    try {
      console.log(requestConfig);
      
      const response = await this.fetcher.fetch(requestConfig.url, {
        ...requestConfig
      })

      if (response.ok) {
        return {
          ...response,
          data: await response.json()
        }
      }

      return {
        status: response.status,
        data: String(response.statusText) || '',
        error: this.toApiError(response.statusText),
        headers: response.headers
      }
    } catch (error) {
      const er = error as Error

      console.error(er.cause);
      

      return {
        data: er.message,
        headers: undefined,
        status: 500,
        error: er
      }
    }
  }

  private toApiError(data: unknown): ApiErrorResponse {
    const strResponse = isObject(data) ? JSON.stringify(data) : String(data)

    return new ApiErrorResponse(strResponse)
  }
}
