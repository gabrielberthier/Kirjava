export interface HttpException {
  status: number
  message: string
  name: string
  error?: Error
  stack?: string
}

export type PojoHttpException = {
  status: number
  message: string
  name: string
}

export class DomainHttpException extends Error implements HttpException {
  status: number
  error?: Error | undefined

  constructor(
    message: string,
    name: string,
    status: number,
    stack?: string,
    error?: Error | undefined
  ) {
    super(message)
    this.name = name
    this.status = status
    this.stack = stack
    this.error = error
  }

  toPojo(): PojoHttpException {
    const { message, status, name } = this

    return {
      message,
      status,
      name
    }
  }
}

export const serverError = (stack?: string, error?: Error | undefined) =>
  new DomainHttpException(
    'A server error occured while processing',
    'ServerError',
    500,
    stack,
    error
  )

export const unauthorizedError = (stack?: string, error?: Error | undefined) =>
  new DomainHttpException('Unauthorized to access resource', 'UnauthorizedError', 401, stack, error)

export const notFoundError = (stack?: string, error?: Error | undefined) =>
  new DomainHttpException('Resource not found', 'ResourceNotFound', 404, stack, error)
