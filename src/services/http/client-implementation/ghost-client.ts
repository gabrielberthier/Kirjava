import GhostContentAPI from '@tryghost/content-api'
import type { HttpClientReader, RawApiResponse } from '../protocols/client'
import type { RequestConfigBuilder, RequestConfig } from '../protocols/request'
import { ApiErrorResponse } from '../protocols/response'
import type { GhostAPI, GhostError } from '@tryghost/content-api'
import { env } from '$env/dynamic/private'

export type EntitiesTypes = 'posts' | 'authors' | 'tags' | 'pages'

export class AxiosClient implements HttpClientReader {
  private requestConfigBuilder: RequestConfigBuilder
  private ghostApi: GhostAPI
  private baseApiPath: string

  constructor(requestConfigBuilder: RequestConfigBuilder, baseApiPath?: string) {
    this.requestConfigBuilder = requestConfigBuilder
    this.baseApiPath = baseApiPath ?? ''

    this.ghostApi = new GhostContentAPI({
      url: env.BACKEND_URL,
      key: env.KEY,
      version: 'v5.0'
    })
  }

  async getData(path: string, params: object): Promise<ArrayBuffer> {
    return new ArrayBuffer(0)
  }

  public async get(path: string, params: any): Promise<RawApiResponse> {
    const isAllowedType = (type: string): type is EntitiesTypes =>
      ['posts', 'authors', 'tags', 'pages'].includes(type)

    if (isAllowedType(path)) {
      try {
        const response = await this.ghostApi[path].browse(params)

        return {
          data: response,
          headers: [],
          status: 200
        }
      } catch (error) {
        const isGhostError = (object: any): object is GhostError => {
          if ('errors' in object && Array.isArray(object.errors)) {
            const errors: [] = object.errors
            return errors.every((el) => ['message', 'errorType'].every((member) => member in el))
          }

          return false
        }
        if (error instanceof Error) {
          if (isGhostError(error)) {
            return {
              error,
              headers: [],
              status: 500,
              data: error.errors
            }
          }
        }

        throw error
      }
    }

    throw new Error('Non available type ' + path)
  }

  dispatch(path: string, params: object) {
    return this.get(path, params)
  }
}
