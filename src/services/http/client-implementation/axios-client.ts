import type { HttpClientReader, RawApiResponse } from '../protocols/client'
import axios, { Axios } from 'axios'
import type { RequestConfigBuilder, RequestConfig } from '../protocols/request'
import { ApiErrorResponse } from '../protocols/response'

export class AxiosClient implements HttpClientReader {
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

  async getData(path: string, params: object): Promise<ArrayBuffer> {
    return new ArrayBuffer(0)
  }

  public async get(path: string, params: any) {
    // build a request config to use kintone REST API
    const requestConfig = await this.requestConfigBuilder.build(
      'get',
      this.baseApiPath + '/' + path,
      params
    )
    return this.sendRequest(requestConfig)
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
