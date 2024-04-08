import { DomainHttpException } from '../exceptions/http-exceptions'
import type { ApiResponse, ErrorResponse } from '../protocols/response'

const convertToHttpDomainError = (err: Error, status: number = 500): DomainHttpException => {
  const { message, name, stack } = err
  
  return new DomainHttpException(message, name, status, stack, err)
}

/**
 *
 * @param {Error} error
 * @returns {Response}
 */
export const errorFor = (error: Error, statusCode: number, headers: any): ErrorResponse => {
  return {
    data: undefined,
    error: convertToHttpDomainError(error),
    status: statusCode,
    success: false,
    headers
  }
}

/**
 *
 * @param {object} data
 * @returns {Response}
 */
export const success = <T>(status: number, data: T, headers: any): ApiResponse<T> => {
  const response = ok(data, headers)
  if (status === 200) response
  return {
    ...response,
    status
  }
}

/**
 *
 * @param {object} data
 * @returns {Response}
 */
export const ok = <T>(data: T, headers: any): ApiResponse<T> => {
  return {
    status: 200,
    data,
    success: true,
    error: undefined,
    headers
  }
}

/**
 *
 * @returns {Response}
 */
export const unprocessableEntity = (error: Error, headers: any): ErrorResponse => {
  return {
    error: convertToHttpDomainError(error, 422),
    status: 422,
    success: false,
    data: undefined,
    headers
  }
}

/**
 *
 * @returns {Response}
 */
export const badRequest = (error: Error, headers: any): ErrorResponse => {
  return {
    data: undefined,
    status: 400,
    error: convertToHttpDomainError(error, 400),
    success: false,
    headers
  }
}
