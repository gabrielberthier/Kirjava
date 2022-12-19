import { badRequest, success, unprocessableEntity } from './responses'
import type { ApiResponse, ErrorResponse } from './responses'

type callableFetch = () => Promise<Response>

export class BaseApiService<T> {
  readonly basePath: string

  constructor(readonly resource: string) {
    this.basePath = '/api'
  }

  getUrl(id: string | number = '') {
    return `${this.basePath}/${this.resource}/${id}`
  }

  async exec(promise: callableFetch): Promise<ApiResponse<T>> {
    try {
      const response = await promise()
      const { status } = response
      if (response.ok) {
        const data = await (<T>response.json())
        return success(status, data)
      }
      return this.failResponseHandler(status, new Error(response.statusText))
    } catch (error) {
      return this.failResponseHandler(0, error as Error)
    }
  }

  async failResponseHandler(status: number, data: Error): Promise<ErrorResponse> {
    switch (status) {
      case 400:
        return badRequest(data)
      case 422:
        return unprocessableEntity(data)
      default:
        return {
          data,
          status,
          error: data,
          success: false
        }
    }
  }

  async fetch(page: string = '1', limit: string = '10', extraParams = {}) {
    const params = { page, limit, ...extraParams }
    return this.exec(async () => self.fetch(this.getUrl() + new URLSearchParams({ ...params })))
  }

  async get(id: string) {
    const { data } = await this.exec(async () => fetch(this.getUrl(id)))
    return data
  }

  // TODO: fix this to use proper init
  async post(data = {}) {
    return this.exec(async () => fetch(this.getUrl(), data))
  }

  async put(id: string | number, data = {}) {
    if (!id) throw Error('Id is not provided')
    return this.exec(async () => fetch(this.getUrl(id), data))
  }

  async delete(id: string | number) {
    if (!id) throw Error('Id is not provided')
    return this.exec(async () => fetch(this.getUrl(id)))
  }
}
