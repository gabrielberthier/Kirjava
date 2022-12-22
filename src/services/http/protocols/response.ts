import { isObject } from '$services/utils/functions'
import type { RawApiResponse } from './client'

export interface SuccessResponse<T> {
  success: true
  data?: T
  error: undefined
  status: number
  headers: any
}

// will contain an Error but no data
export interface ErrorResponse {
  success: false
  data: undefined
  error: Error
  status: number
  headers: any
}

export class ApiErrorResponse extends Error {
  constructor(message: string | object) {
    if (isObject(message)) {
      message = JSON.stringify(message)
    }
    super(message as string)
  }
}

// our union type
export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse

export interface ResponseHandler<T = any> {
  handle: (response: RawApiResponse) => Promise<ApiResponse<T>>
}
