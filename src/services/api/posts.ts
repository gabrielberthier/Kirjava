import { BaseApiService } from '../http'
import type { EndpointOutput } from '../http/types'

export async function get<T>(): Promise<EndpointOutput<T>> {
  const res = await fetch('http://localhost:1337/api/posts?populate=*')
  const data = await res.json()
  return { body: data }
}

export class PostService extends BaseApiService<>