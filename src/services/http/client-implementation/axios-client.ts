import type { JsonClientReader, RawApiResponse } from '../protocols/client'
import axios, { Axios } from 'axios'
import type { RequestConfigBuilder, RequestConfig } from '../protocols/request'
import { ApiErrorResponse } from '../protocols/response'

export class AxiosClient implements JsonClientReader {
  private requestConfigBuilder: RequestConfigBuilder
  private axios: Axios
  private baseApiPath: string

  constructor(requestConfigBuilder: RequestConfigBuilder, baseApiPath?: string) {
    this.requestConfigBuilder = requestConfigBuilder
    this.baseApiPath = baseApiPath ?? ''

    this.axios = new Axios({
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }

  public async get(path: string, params: any) {
    const requestConfig = await this.requestConfigBuilder.build(
      'get',
      [this.baseApiPath, path].filter((el) => el).join('/'),
      params
    )

    return this.sendRequest(requestConfig)
  }

  dispatch(path: string, params: object) {
    return this.get(path, params)
  }

  private async sendRequest(requestConfig: RequestConfig): Promise<RawApiResponse> {
    try {
      const response = await this.axios.request({
        ...requestConfig,
        maxContentLength: Infinity
      })

      return response
    } catch (error) {
      if (axios.isAxiosError(error)) {
        let apiError: ApiErrorResponse
        if (error.response) {
          apiError = new ApiErrorResponse(error.response.data as object | string)
          return {
            data: error.status || '',
            headers: error.response.headers,
            status: error.response.status,
            error: apiError
          }
        } else if (error.request) {
          apiError = new ApiErrorResponse(error.request as object | string)
          return {
            data: error.status || '',
            headers: undefined,
            status: 500,
            error: apiError
          }
        }
      }

      const er = error as Error

      return {
        data: er.message,
        headers: undefined,
        status: 500,
        error: er
      }
    }
  }
}
