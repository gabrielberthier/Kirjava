import type { HttpClientReader, RawApiResponse } from './protocols/client'
import type { ApiResponse, ResponseHandler } from './protocols/response'

type CallableFetch = () => Promise<RawApiResponse>

export class ReaderApiService<T> {
  readonly basePath: string

  constructor(
    private readonly url: string,
    private readonly resource: string,
    private client: HttpClientReader,
    private responseHandler: ResponseHandler<T>
  ) {
    this.basePath = '/api'
  }

  getUrl(id: string | number = '') {
    return `${this.url}/${this.basePath}/${this.resource}/${id}`
  }

  async exec(call: CallableFetch): Promise<ApiResponse<T>> {
    const response = await call()
    return this.responseHandler.handle(response)
  }

  async getAll(page: string = '1', limit: string = '10', extraParams = {}) {
    const params = { page, limit, ...extraParams }
    return this.exec(async () => this.client.get(this.getUrl(), params))
  }

  async get(id: string, params: any) {
    const { data } = await this.exec(async () => this.client.get(this.getUrl(id), params))
    return data
  }
}
