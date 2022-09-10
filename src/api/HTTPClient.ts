import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface IHTTPClient {
  $get: (url: string, config?: AxiosRequestConfig) => never,
  $post: (url: string, data?: never, config?: AxiosRequestConfig) => never,
  $put: (url: string, data?: never, config?: AxiosRequestConfig) => never,
  $delete: (url: string, config?: AxiosRequestConfig) => never,
}

const $get = (url: string, config?: never): Promise<AxiosResponse<never>> => axios.get(url, config);

export default {
  $get,
} as IHTTPClient;
