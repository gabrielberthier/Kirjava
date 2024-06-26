import type { JsonClientReader, RawApiResponse } from '../../protocols/client'
import { Axios, AxiosError } from 'axios'
import type { AxiosResponse } from 'axios'
import type { RequestConfigBuilder, RequestConfig } from '../../protocols/request'
import { ApiErrorResponse } from '../../protocols/errors'
import { isObject } from '$services/utils/is'

const isAxiosError = (payload: any): payload is AxiosError => {
  return isObject(payload) && 'isAxiosError' in payload && payload.isAxiosError === true
}

const toApiError = ({ data }: AxiosResponse<unknown, any>): ApiErrorResponse => {
  const strResponse = isObject(data) ? JSON.stringify(data) : String(data)

  return new ApiErrorResponse(strResponse)
}

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

      if (response.status >= 200 && response.status < 300) {
        return response
      }

      throw new AxiosError(response.statusText, `${response.status}`)
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          return {
            data: String(error.status) || '',
            headers: error.response.headers,
            status: error.response.status,
            error: toApiError(error.response)
          }
        } else if (error.request) {
          return {
            data: String(error.status) || '',
            headers: undefined,
            status: 500,
            error: error.request
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
