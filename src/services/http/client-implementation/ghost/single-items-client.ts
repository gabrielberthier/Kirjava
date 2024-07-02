import GhostContentAPI from '@tryghost/content-api'
import type { JsonClientReader, RawApiResponse } from '../../protocols/client'
import type { GhostAPI } from '@tryghost/content-api'
import { isAllowedType, isGhostError } from './is-type'
import { handleCommonError, handleGhostError } from './handle-error'

export class GhostSingleItemClient implements JsonClientReader {
  private ghostApi: GhostAPI

  constructor(backendUrl: string, key: string) {
    this.ghostApi = new GhostContentAPI({
      url: backendUrl,
      key: key,
      version: 'v5.0'
    })
  }

  public async get(path: string, params: any): Promise<RawApiResponse> {
    return this.dispatch(path, params)
  }

  async dispatch(path: string, params: any): Promise<RawApiResponse> {
    if (!isAllowedType(path)) {
      throw new Error('Non available type ' + path)
    }

    try {
      const promiseData = await this.ghostApi[path].read({ ...params, include: 'tags,authors' })

      return {
        data: promiseData,
        headers: [],
        status: 200
      }
    } catch (error) {
      if (isGhostError(error)) {
        return handleGhostError(error)
      }

      if (error instanceof Error) {
        return handleCommonError(error)
      }

      throw new Error('Unrecognized error ')
    }
  }
}
