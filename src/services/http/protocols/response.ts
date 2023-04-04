import type { DomainHttpException } from '../exceptions/http-exceptions'
import type { RawApiResponse } from './client'

export interface SuccessResponse<T> {
  success: true
  data: T
  error: undefined
  status: number
  headers: any
}

// will contain an Error but no data
export interface ErrorResponse {
  success: false
  data: undefined
  error: DomainHttpException
  status: number
  headers: any
}

// our union type
export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse

export interface ResponseHandler<T = any> {
  handle: (response: RawApiResponse) => Promise<ApiResponse<T>>
}
