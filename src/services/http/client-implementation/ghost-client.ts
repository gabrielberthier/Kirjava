import GhostContentAPI from '@tryghost/content-api'
import type { JsonClientReader, RawApiResponse } from '../protocols/client'
import type { GhostAPI, GhostError } from '@tryghost/content-api'
import { env } from '$env/dynamic/private'

export type EntitiesTypes = 'posts' | 'authors' | 'tags' | 'pages'

export class GhostClient implements JsonClientReader {
  private ghostApi: GhostAPI

  constructor(readonly ghostUrl: string) {
    console.log(env);
    
    this.ghostApi = new GhostContentAPI({
      url: ghostUrl,
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
          data: {
            [path]: response,
            meta: response.meta
          },
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

export class GhostClientSingle implements JsonClientReader {
  private ghostApi: GhostAPI

  constructor(readonly ghostUrl: string) {
    this.ghostApi = new GhostContentAPI({
      url: ghostUrl,
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
        const response = await this.ghostApi[path].read(params)

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
