import {
  DomainHttpException,
  notFoundError,
  serverError,
  unauthorizedError
} from '$services/http/exceptions/http-exceptions'
import type { RawApiResponse } from '$services/http/protocols/client'
import type { GhostError } from '@tryghost/content-api'

export function handleGhostError(error: GhostError): RawApiResponse {
  const ghostError = error.errors.pop()

  const stack = error.errors.join('\n')
  const message = ghostError?.message
  const errorType = ghostError?.errorType ?? ''
  const newError = new Error(message)
  const mappedErrors: Record<string, DomainHttpException> = {
    UnauthorizedError: unauthorizedError(stack, newError),
    NotFoundError: notFoundError(stack, newError)
  }

  const mappedGhostError = mappedErrors[errorType] ?? serverError(stack, newError)

  console.error('\x1b[31m%s\x1b[0m', 'Found error')
  console.error('\x1b[31m%s\x1b[0m', error)
  console.error('\x1b[31m%s\x1b[0m', error.errors.map((el) => el.errorType).join('\n'))

  return {
    error: mappedGhostError,
    headers: [],
    status: mappedGhostError.status,
    data: mappedGhostError.message
  }
}

export function handleCommonError(error: Error): RawApiResponse {
  console.error('\x1b[31m%s\x1b[0m', 'Found error')
  console.error('\x1b[31m%s\x1b[0m', error.stack)

  const commonError = serverError(error.stack, error)

  return {
    error: commonError,
    headers: [],
    status: commonError.status,
    data: commonError.message
  }
}
