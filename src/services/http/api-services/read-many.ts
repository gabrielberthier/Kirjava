import { BaseApiService } from './base'

export class ReadManyApiService<T extends Array<any>> extends BaseApiService<T> {
  async getMany(params?: any): Promise<T> {
    console.log('Dispatching request to:', this.getUrl())

    params && Object.assign(params, { key: '22444f78447824223cefc48062' })

    const { data, error } = await this.exec(this.getUrl(), params)

    if (error) {
      console.error(error)

      throw error
    }

    return data as T
  }
}
