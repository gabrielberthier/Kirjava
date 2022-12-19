export interface SuccessResponse<T> {
  success: true
  data: T
  error: undefined
  status: number
}

// will contain an Error but no data
export interface ErrorResponse {
  success: false
  data: undefined | any
  error: Error
  status: number
}

// our union type
export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse

/**
 *
 * @param {Error} error
 * @returns {Response}
 */
export const errorFor = (error: Error, statusCode: number): ApiResponse<Error> => {
  return {
    data: undefined,
    error,
    status: statusCode,
    success: false
  }
}

/**
 *
 * @param {object} data
 * @returns {Response}
 */
export const success = <T>(status: number, data: T): ApiResponse<T> => {
  const response = ok(data)
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
export const ok = <T>(data: T): ApiResponse<T> => {
  return {
    status: 200,
    data,
    success: true,
    error: undefined
  }
}

/**
 *
 * @param {object} data
 * @returns {Response}
 */
export const unprocessableEntity = (data: Error): ErrorResponse => {
  const statusText =
    'Não é possível processar a requisição. ' +
    'Um ou mais campos podem estar inválidos ' +
    'ou a requisição pode estar em formato errado'
  return {
    error: data,
    status: 422,
    success: false,
    data
  }
}

/**
 *
 * @param {object} data
 * @returns {Response}
 */
export const badRequest = (data: Error): ErrorResponse => {
  let reason = data?.message

  return {
    data: { reason },
    status: 400,
    error: data,
    success: false
  }
}
