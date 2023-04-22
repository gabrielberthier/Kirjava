import GhostContentAPI from '@tryghost/content-api'
import type { JsonClientReader, RawApiResponse } from '../../protocols/client'
import type { GhostAPI } from '@tryghost/content-api'
import { env } from '$env/dynamic/private'
import { isAllowedType, isGhostError } from './is-type'
import {
  DomainHttpException,
  notFoundError,
  serverError,
  unauthorizedError
} from '$services/http/exceptions/http-exceptions'

export class GhostClient implements JsonClientReader {
  private ghostApi: GhostAPI

  constructor(readonly ghostUrl: string, readonly singleItem: boolean) {
    this.ghostApi = new GhostContentAPI({
      url: ghostUrl,
      key: env.KEY ?? '',
      version: 'v5.0'
    })
  }

  public async get(path: string, params: any): Promise<RawApiResponse> {
    console.log(`path: ${path}`)
    console.log(`params: ${ params}`)

    return this.dispatch(path, params)
  }

  async dispatch(path: string, params: any): Promise<RawApiResponse> {
    if (isAllowedType(path)) {
      try {
        let data: object
        if (this.singleItem) {
          const entity = await this.ghostApi[path].read(params)
          data = { ...entity }
        } else {
          const response = await this.ghostApi[path].browse(params)
          data = { [path]: response, meta: response?.meta }
        }

        return {
          data,
          headers: [],
          status: 200
        }
      } catch (error) {
        if (isGhostError(error)) {
          let finalMistake: DomainHttpException
          const ghostError = error.errors.pop()
          const stack = error.errors.join('\n')
          const message = ghostError?.message
          const newError = new Error(message)
          switch (ghostError?.errorType) {
            case 'UnauthorizedError':
              finalMistake = unauthorizedError(stack, newError)
              break
            case 'NotFoundError':
              finalMistake = notFoundError(stack, newError)
              break
            default:
              finalMistake = serverError(stack, newError)
          }

          console.error('\x1b[31m%s\x1b[0m', 'Found error')
          console.error('\x1b[31m%s\x1b[0m', error)

          return {
            error: finalMistake,
            headers: [],
            status: finalMistake.status,
            data: finalMistake.message
          }
        } else if (error instanceof Error) {
          console.error('\x1b[31m%s\x1b[0m', 'Found error')
          console.error('\x1b[31m%s\x1b[0m', error.stack)

          const finalMistake = serverError(error.stack, error)

          return {
            error: finalMistake,
            headers: [],
            status: finalMistake.status,
            data: finalMistake.message
          }
        } else {
          throw new Error('Unrecognized error ')
        }
      }
    }
    throw new Error('Non available type ' + path)
  }
}
