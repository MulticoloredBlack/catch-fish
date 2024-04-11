import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';

export default abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }
  private _initializeRequestInterceptor =()=>{
  
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig)=>{
        return config;
      }, (err: Error)=>{
        return Promise.reject(err);
      }
    );

  };
  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError,
    );
  };
  public async get<T = any, R = AxiosResponse<T>>(
    url: string, params?: any): Promise<R>{
    return await this.instance.get<T, R>(url, { params });
  }

  public async post<T = unknown>(url: string, data?: any){
    return await this.instance.post<T>(url, data);
  }
  public async put<T = unknown>(url: string, data?: any){
    return await this.instance.put<T>(url, data);
  }
  public async patch<T = unknown>(url: string, data?: any){ 
    return  await this.instance.patch<T>(url, data);
  }
  public async delete<T = unknown>(url: string, data?: any){
    return  await this.instance.delete<T>(url, data);
  }
  public async request<T = unknown>(option: AxiosRequestConfig){
    return await this.instance.request<T>(option);
  }
  private _handleResponse = ( res: AxiosResponse) => {
    return res;
  };

  private _handleError = (error: any) =>{
    return Promise.reject(error);
  };
}