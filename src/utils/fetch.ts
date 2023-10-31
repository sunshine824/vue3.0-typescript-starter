import { getToken, clearLoginInfo } from './util'
import { ApiConfig } from './apiConfig'
import { ElMessage } from 'element-plus'
import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios'

const CancelToken = axios.CancelToken
const source = CancelToken.source()
let isToLogin = false

export interface AxiosParamsConfig extends AxiosRequestConfig {
  prefix?: string
  noShowErr?: boolean // 是否显示接口报错信息
}
// 多入口请求地址配置
const BaseUrl: any = ApiConfig[window.env]

// create an axios instance
const service: AxiosInstance = axios.create({
  timeout: 60 * 1000,
  headers: {}
})

/**
 * 请求拦截
 */
service.interceptors.request.use(
  (config: AxiosParamsConfig) => {
    let split = '?'
    const langs: { [key: string]: any } = { zhCN: 'zh-cn', en: 'en' }
    const localLang = localStorage.getItem('languageKey') as string
    // 根据接口前缀指定对应请求地址
    config.baseURL = BaseUrl[config?.prefix as string]
    config.headers.common['Accept-Language'] = langs[localLang]
    config.headers.common.Authorization = getToken() // 请求头带上token
    config.headers.common.token = getToken()
    config.cancelToken = source.token // 全局添加cancelToken
    if ((config.url as string).indexOf('?') > -1) {
      split = '&'
    } else {
      split = '?'
    }
    if (window.env == 'development' && window.$Prefix == 'personal') {
      config.url += `${split}domainName=localhost`
    } else {
      config.url += `${split}domainName=${location.host}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

/**
 * 响应拦截
 */
service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status == 201 || response.status == 200) {
      const { code, message } = response.data
      const succCode = [200, 201, '200', '201']
      const loginCode = [222, 223, 224]
      if (succCode.includes(code) || !code) {
        return Promise.resolve(response) // 返回成功数据
      } else {
        const config: AxiosParamsConfig = response.config
        // 是否过滤报错信息
        if (!config?.noShowErr && code == 400) {
          message ? ElMessage.error(message) : null
        }
        if (loginCode.includes(code)) {
          if (!isToLogin) {
            isToLogin = true
            ElMessage.error('您已掉线，请重新登录')
          }
          clearLoginInfo()
          return Promise.reject(response)
        } else {
          return Promise.reject(response)
        }
      }
    }
    return response
  },
  (error) => {
    if (error.response.status) {
      // switch (error.response.status) {
      //   case 500:
      //     Notification.error({
      //       message: '温馨提示',
      //       description: '服务异常，请重启服务器！'
      //     })
      //     break
      //   case 401:
      //     Notification.error({
      //       message: '温馨提示',
      //       description: '服务异常，请重启服务器！'
      //     })
      //     break
      //   case 403:
      //     Notification.error({
      //       message: '温馨提示',
      //       description: '服务异常，请重启服务器！'
      //     })
      //     break
      //   // 404请求不存在
      //   case 404:
      //     Notification.error({
      //       message: '温馨提示',
      //       description: '服务异常，请重启服务器！'
      //     })
      //     break
      //   default:
      //     Notification.error({
      //       message: '温馨提示',
      //       description: '服务异常，请重启服务器！'
      //     })
      // }
    }
    return Promise.reject(error.response)
  }
)

interface Http {
  fetch<T>(params: AxiosParamsConfig): Promise<T>
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
  }
}

export interface UploadFileParams {
  url: string
  file: any
  progressCallBack?(progress: number): void
  successCallBack?(res: any): void
  failCallBack?(err: any): void
}

// 上传文件到指定url
export const uploadFileToUrl = (params: UploadFileParams) => {
  const { url, file, progressCallBack, successCallBack, failCallBack } = params
  axios
    .put(url, file, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      transformRequest: [
        function (data) {
          return data
        }
      ],
      onUploadProgress: (progressEvent) => {
        if (progressEvent.lengthComputable) {
          const progress = ((progressEvent.loaded / progressEvent.total) * 100) | 0
          progressCallBack && progressCallBack(progress)
        }
      }
    })
    .then((res) => {
      successCallBack && successCallBack(res)
    })
    .catch((err) => {
      failCallBack && failCallBack(err)
    })
}

export default http['fetch']
