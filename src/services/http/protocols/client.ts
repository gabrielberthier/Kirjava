export type HttpMethod = 'get' | 'post' | 'put' | 'delete'

export type ProxyConfig = {
  host: string
  port: number
  auth?: {
    username: string
    password: string
  }
}

export type Response = Promise<RawApiResponse>

export interface HttpClient{
  dispatch: (path: string, params: object) => Response
}

export interface HttpClientReader extends HttpClient {
  get: (path: string, params: object) => Response
  getData: (path: string, params: object) => Promise<ArrayBuffer>
}

export interface HttpClientWritter extends HttpClientReader {
  post: (path: string, params: object) => Response
  postData: (path: string, params: FormData) => Response
  put: (path: string, params: object) => Response
  delete: (path: string, params: object) => Response
}

export type Params = { [key: string]: unknown }

export interface RawApiResponse {
  data: string | object
  headers: any
  status: number
  error?: Error
}
