import type { ApiResponse } from '../protocols/response'
import { BaseApiService } from './base'

export class ReaderApiService<T> extends BaseApiService<T> {
  async get(id: string, params?: any): Promise<ApiResponse<T>> {
    return this.exec(this.getUrl(id), params)
  }
}
