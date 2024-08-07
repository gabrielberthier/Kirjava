import type { JsonClientReader } from '../../protocols/client'
import { ApiErrorResponse } from '../../protocols/errors'
import { isObject } from '$services/utils/is'

export class FetchDecorator implements JsonClientReader {
  public async get(path: string, params: any) {
    try {
      const response = await fetch(path, params)
      
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

      console.error(er.cause)

      return {
        data: er.message,
        headers: undefined,
        status: 500,
        error: er
      }
    }
  }

  dispatch(path: string, params: object) {
    return this.get(path, params)
  }

  private toApiError(data: unknown): ApiErrorResponse {
    const strResponse = isObject(data) ? JSON.stringify(data) : String(data)

    return new ApiErrorResponse(strResponse)
  }
}
