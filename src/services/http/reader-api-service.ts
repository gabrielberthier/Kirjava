import type { HttpClientReader, RawApiResponse } from './protocols/client'
import type { ApiResponse, ResponseHandler } from './protocols/response'

export class ReaderApiService<T> {
  constructor(
    private readonly resource: string,
    private client: HttpClientReader,
    private responseHandler: ResponseHandler<T>
  ) {
  }

  getUrl(id: string | number = '') {
    return `${this.resource}/${id}`
  }

  async exec(promised: Promise<RawApiResponse>): Promise<ApiResponse<T>> {
    const response = await promised
    return this.responseHandler.handle(response)
  }

  async getAll(page: string = '1', limit: string = '10', extraParams = {}): Promise<ApiResponse<T>> {
    const params = { page, limit, ...extraParams }
    return this.exec(this.client.get(this.getUrl(), params))
  }

  async get(id: string, params: any): Promise<T> {
    console.log('Dispatching request to:', this.getUrl(id));
    
    const { data, error } = await this.exec(this.client.get(this.getUrl(id), {key: '22444f78447824223cefc48062'}))
    if(error){
      console.error(error)
      throw error
    }
    
    return data as T
  }
}
