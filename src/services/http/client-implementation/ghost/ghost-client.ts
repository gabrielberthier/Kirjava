import GhostContentAPI from '@tryghost/content-api'
import type { JsonClientReader, RawApiResponse } from '../../protocols/client'
import type { GhostAPI, GhostError } from '@tryghost/content-api'
import { env } from '$env/dynamic/private'
import { isAllowedType, isGhostError } from './is-type'
import {
  DomainHttpException,
  notFoundError,
  serverError,
  unauthorizedError
} from '$services/http/exceptions/http-exceptions'
import type { EntitiesTypes } from './types'

export class GhostClient implements JsonClientReader {
  private ghostApi: GhostAPI

  constructor(readonly singleItem: boolean) {
    this.ghostApi = new GhostContentAPI({
      url: env.BACKEND_URL ?? "https://site.com",
      key: env.KEY ?? (Math.random() + 1).toString(36).substring(26),
      version: 'v5.0'
    })
  }

  public async get(path: string, params: any): Promise<RawApiResponse> {
    return this.dispatch(path, params)
  }

  async dispatch(path: string, params: any): Promise<RawApiResponse> {
    if (isAllowedType(path)) {
      try {
        const promiseData = this.singleItem
          ? this.getSingle(path, params)
          : this.getMany(path, params)
        
          
        return {
          data: await promiseData,
          headers: [],
          status: 200
        }
      } catch (error) {
        if (isGhostError(error)) {
          return this.handleGhostError(error)
        } else if (error instanceof Error) {
          return this.handleCommonError(error)
        }

        throw new Error('Unrecognized error ')
      }
    }
    
    throw new Error('Non available type ' + path)
  }

  private async getSingle(path: EntitiesTypes, params: any) {
    const data = await this.ghostApi[path].read({ ...params, include: 'tags,authors' })

    return { ...data }
  }

  private async getMany(path: EntitiesTypes, params: any) {
    const response = await this.ghostApi[path].browse({ ...params, include: 'tags,authors' })

    return { [path]: response, meta: response?.meta }
  }

  private handleGhostError(error: GhostError): RawApiResponse {
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
    console.error('\x1b[31m%s\x1b[0m', error.errors.map((el) => el.errorType).join('\n'))

    return {
      error: finalMistake,
      headers: [],
      status: finalMistake.status,
      data: finalMistake.message
    }
  }

  private handleCommonError(error: Error): RawApiResponse {
    console.error('\x1b[31m%s\x1b[0m', 'Found error')
    console.error('\x1b[31m%s\x1b[0m', error.stack)

    const finalMistake = serverError(error.stack, error)

    return {
      error: finalMistake,
      headers: [],
      status: finalMistake.status,
      data: finalMistake.message
    }
  }
}
