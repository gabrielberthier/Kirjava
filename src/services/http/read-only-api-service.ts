import { BaseApiService } from './reader-api-service'

export default class ReadOnlyApiService extends BaseApiService {
  async fetch(page = 1, limit = 10, extraParams = {}) {
    const params = { page, limit, ...extraParams }
    return this.exec(async () => this.api.get(this.getUrl(), { params }))
  }

  async get(id) {
    const { data } = await this.exec(async () => this.api.get(this.getUrl(id)))
    return data
  }
}