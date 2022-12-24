import { BaseApiService } from './base'

export class ReaderApiService<T> extends BaseApiService<T> {
  async get(id: string, params?: any): Promise<T> {
    console.log('Dispatching request to:', this.getUrl(id))

    params && Object.assign(params, { key: '22444f78447824223cefc48062' })

    const { data, error } = await this.exec(this.getUrl(id), params)

    if (error) {
      console.error(error)

      throw error
    }

    return data as T
  }
}
