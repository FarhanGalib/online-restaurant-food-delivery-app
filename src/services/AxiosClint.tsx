import _axios, {
  Axios,
  AxiosError,
  isAxiosError,
  AxiosResponse,
  AxiosHeaderValue,
  RawAxiosRequestHeaders,
  InternalAxiosRequestConfig,
} from 'axios';

type CommonRequestHeadersList =
  | 'Accept'
  | 'Content-Length'
  | 'User-Agent'
  | 'Content-Encoding'
  | 'Authorization'
  | 'Content-Type'
  | string;

class AxiosClient {
  axios: Axios;

  constructor(baseURL: string, timeout = 10000) {
    this.axios = _axios.create({
      baseURL,
      timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.axios.interceptors.request.use(this.interceptRequest);
    this.axios.interceptors.response.use(
      this.interceptSuccess,
      this.interceptError
    );
  }

  interceptRequest(config: InternalAxiosRequestConfig) {
    return config;
  }

  interceptSuccess(response: AxiosResponse) {
    return response.data;
  }

  interceptError(error: AxiosError) {
    if (isAxiosError(error)) {
      return Promise.reject(error.response?.data);
    }
    return Promise.reject({
      statusCode: 500,
      message: 'Something went wrong!',
    });
  }

  addHeader(header: CommonRequestHeadersList, value: AxiosHeaderValue) {
    this.axios.defaults.headers.common[header] = value;
  }

  addContentType(
    value:
      | 'text/html'
      | 'text/plain'
      | 'multipart/form-data'
      | 'application/json'
      | 'application/x-www-form-urlencoded'
      | 'application/octet-stream'
      | 'multipart/form-data; boundary=<calculated when request is sent>'
  ) {
    this.axios.defaults.headers.post['Content-Type'] = value;
  }

  removeHeader(header: keyof RawAxiosRequestHeaders) {
    this.axios.defaults.headers.delete[header];
  }
}

export default AxiosClient;
