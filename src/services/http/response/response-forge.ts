import type { ApiResponse, ErrorResponse } from "../protocols/response"

/**
 *
 * @param {Error} error
 * @returns {Response}
 */
export const errorFor = (
  error: Error,
  statusCode: number,
  headers: any,
): ErrorResponse => {
  
  return {
    data: undefined,
    error,
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
 * @param {object} data
 * @returns {Response}
 */
export const unprocessableEntity = (error: Error, headers: any): ErrorResponse => {
  const statusText =
    'Não é possível processar a requisição. ' +
    'Um ou mais campos podem estar inválidos ' +
    'ou a requisição pode estar em formato errado'
  return {
    error,
    status: 422,
    success: false,
    data: undefined,
    headers
  }
}

/**
 *
 * @param {object} data
 * @returns {Response}
 */
export const badRequest = (error: Error, headers: any): ErrorResponse => {
  return {
    data: undefined,
    status: 400,
    error,
    success: false,
    headers
  }
}
