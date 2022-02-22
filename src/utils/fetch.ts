import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios'
import { getToken } from './util'
import { Modal } from 'ant-design-vue'
import { Message, Notification } from '@/utils/resetMessage'

// .env环境变量
const BaseUrl = import.meta.env.VITE_API_BASE_URL as string

// create an axios instance
const service: AxiosInstance = axios.create({
  baseURL: BaseUrl, // 正式环境
  timeout: 60 * 1000,
  headers: {},
})

/**
 * 请求拦截
 */
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers.common.Authorization = getToken() // 请求头带上token
    config.headers.common.token = getToken()
    return config
  },
  (error) => Promise.reject(error),
)

/**
 * 响应拦截
 */
service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status == 201 || response.status == 200) {
      const { code, status, msg } = response.data
      if (code == 401) {
        Modal.warning({
          title: 'token出错',
          content: 'token失效，请重新登录！',
          onOk: () => {
            sessionStorage.clear()
          },
        })
      } else if (code == 200) {
        if (status) {
          // 接口请求成功
          msg && Message.success(msg) // 后台如果返回了msg，则将msg提示出来
          return Promise.resolve(response) // 返回成功数据
        }
        // 接口异常
        msg && Message.warning(msg) // 后台如果返回了msg，则将msg提示出来
        return Promise.reject(response) // 返回异常数据
      } else {
        // 接口异常
        msg && Message.error(msg)
        return Promise.reject(response)
      }
    }
    return response
  },
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        case 500:
          Notification.error({
            message: '温馨提示',
            description: '服务异常，请重启服务器！',
          })
          break
        case 401:
          Notification.error({
            message: '温馨提示',
            description: '服务异常，请重启服务器！',
          })
          break
        case 403:
          Notification.error({
            message: '温馨提示',
            description: '服务异常，请重启服务器！',
          })
          break
        // 404请求不存在
        case 404:
          Notification.error({
            message: '温馨提示',
            description: '服务异常，请重启服务器！',
          })
          break
        default:
          Notification.error({
            message: '温馨提示',
            description: '服务异常，请重启服务器！',
          })
      }
    }
    return Promise.reject(error.response)
  },
)

interface Http {
  fetch<T>(params: AxiosRequestConfig): Promise<StoreState.ResType<T>>
}

const http: Http = {
  fetch(params) {
    return new Promise((resolve, reject) => {
      service(params)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err.data)
        })
    })
  },
}

export default http['fetch']
