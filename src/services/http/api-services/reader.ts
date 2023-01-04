import { BaseApiService } from './base'

export class ReaderApiService<T> extends BaseApiService<T> {
  async get(id: string, params?: any): Promise<T> {
    const { data, error } = await this.exec(this.getUrl(id), params)

    if (error) {
      console.error(error)
      console.error(data)

      throw error
    }

    return data as T
  }
}
