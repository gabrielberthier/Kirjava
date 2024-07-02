import type { HttpMethod, Params, ProxyConfig } from '../protocols/client';
import type { RequestConfig, RequestConfigBuilder } from '../protocols/request';
import { stringify } from 'qs';
import { removeTrailingSlash } from '$services/utils/string-belt';

type Data = Params | FormData;

const THRESHOLD_AVOID_REQUEST_URL_TOO_LARGE = 4096;

export class ImplementationRequestConfigBuilder implements RequestConfigBuilder {
  private baseUrl: string;
  private headers?: Record<string, string>;
  private proxy?: ProxyConfig;

  constructor({ baseUrl, proxy, headers }: { baseUrl: string; proxy?: ProxyConfig; headers?: Record<string, string> }) {
    this.baseUrl = removeTrailingSlash(baseUrl);
    this.proxy = proxy;
    this.headers = headers;
  }

  public async build(
    method: HttpMethod,
    path: string,
    params: Data,
    options?: { responseType: 'arraybuffer' }
  ): Promise<RequestConfig> {
    const requestConfig: RequestConfig = {
      method,
      headers: this.headers,
      url: `${this.baseUrl}/${path}`,
      ...(options ?? {}),
      proxy: this.proxy,
    };

    switch (method) {
      case 'get':
        return this.buildGetRequestConfig(requestConfig, path, params);
      case 'post':
        return this.buildPostRequestConfig(requestConfig, params);
      case 'put':
        return this.buildPutRequestConfig(requestConfig, params);
      case 'delete':
        return this.buildDeleteRequestConfig(requestConfig, path, params);
      default:
        throw new Error(`${method} method is not supported`);
    }
  }

  private async buildGetRequestConfig(requestConfig: RequestConfig, path: string, params: Data): Promise<RequestConfig> {
    const requestUrl = this.buildRequestUrl(path, params);
    if (requestUrl.length > THRESHOLD_AVOID_REQUEST_URL_TOO_LARGE) {
      return {
        ...requestConfig,
        method: 'post',
        headers: { ...this.headers, 'X-HTTP-Method-Override': 'GET' },
        data: await this.buildData(params),
      };
    }
    return {
      ...requestConfig,
      url: requestUrl,
    };
  }

  private async buildPostRequestConfig(requestConfig: RequestConfig, params: Data): Promise<RequestConfig> {
    if (params instanceof FormData) {
      return {
        ...requestConfig,
        data: params,
      };
    }
    return {
      ...requestConfig,
      data: await this.buildData(params),
    };
  }

  private async buildPutRequestConfig(requestConfig: RequestConfig, params: Data): Promise<RequestConfig> {
    return {
      ...requestConfig,
      data: await this.buildData(params),
    };
  }

  private async buildDeleteRequestConfig(requestConfig: RequestConfig, path: string, params: Data): Promise<RequestConfig> {
    const requestUrl = this.buildRequestUrl(path, await this.buildData(params));
    return {
      ...requestConfig,
      url: requestUrl,
    };
  }

  private async buildData<T extends Data>(params: T): Promise<T> {
    return params;
  }

  private buildRequestUrl(path: string, params: Data): string {
    const queryString = params ? `?${stringify(params)}` : '';
    return `${this.baseUrl}/${path}${queryString}`;
  }
}
