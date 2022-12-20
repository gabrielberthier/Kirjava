import type { HttpClientReader, RawApiResponse } from '../protocols/client'
import axios, { Axios } from 'axios'
import type { RequestConfigBuilder, RequestConfig } from '../protocols/request'

export class AxiosClient implements HttpClientReader {
  private requestConfigBuilder: RequestConfigBuilder
  private axios: Axios

  constructor(url: string, requestConfigBuilder: RequestConfigBuilder) {
    this.requestConfigBuilder = requestConfigBuilder
    const baseURL = url
    this.axios = new Axios({
      baseURL,
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
    const requestConfig = await this.requestConfigBuilder.build('get', path, params)
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
        if (error.response) {
          return {
            data: error.response.data || {},
            headers: error.response.headers,
            status: error.response.status,
            error: error
          }
        } else if (error.request) {
          return {
            data: error.request,
            headers: undefined,
            status: 500,
            error: error
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
