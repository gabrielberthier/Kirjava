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

export interface HttpClient {
  dispatch: (path: string, params: object) => Response
}

export interface JsonClientReader extends HttpClient {
  get: (path: string, params: object) => Response
}

export interface JsonClientWritter extends JsonClientReader {
  post: (path: string, params: object) => Response
  put: (path: string, params: object) => Response
  delete: (path: string, params: object) => Response
}

export interface BinaryClientReader extends HttpClient {
  getData: (path: string, params: object) => Promise<ArrayBuffer>
}

export interface FormDataClientPoster extends HttpClient {
  postData: (path: string, params: FormData) => Response
}

export type Params = { [key: string]: unknown }

export interface RawApiResponse {
  data: string | object
  headers: any
  status: number
  error?: Error
}
