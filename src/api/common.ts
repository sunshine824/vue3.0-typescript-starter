import qs from 'qs'
import fetch from '@/utils/fetch'
import { ICommonApi } from './types/common_types'
import { ApiConfig } from '@/utils/apiConfig'

const BaseUrl = ApiConfig[window.env]

const CommonApi: ICommonApi = {
  // 文件上传地址
  getBleuUploadUrl: (params) => {
    return fetch({
      method: 'post', // 请求方式
      prefix: 'JeemaaPortalManage', // 前缀
      url: `/${window.$Prefix}/projectManager/getBleuUploadUrl`, // 请求地址
      data: qs.stringify(params)
    })
  },
  // 获取音频上传地址
  getVoiceUploadUrl: (params) => {
    return fetch({
      method: 'post', // 请求方式
      prefix: 'JeemaaPortalManage', // 前缀
      url: `/${window.$Prefix}/projectManager/getVoiceUploadUrl`, // 请求地址
      data: qs.stringify(params)
    })
  },
  // 获取视频上传地址
  getVideoUploadUrl: (params) => {
    return fetch({
      method: 'post', // 请求方式
      prefix: 'JeemaaPortalManage', // 前缀
      url: `/${window.$Prefix}/projectManager/getVideoUploadUrl`, // 请求地址
      data: qs.stringify(params)
    })
  },
  // 获取图片第三方地址
  getPicUploadUrl: (params) => {
    return fetch({
      method: 'post', // 请求方式
      prefix: 'JeemaaPortalManage', // 前缀
      url: `/${window.$Prefix}/projectManager/getPicUploadUrl`, // 请求地址
      data: qs.stringify(params)
    })
  },
  // 获取Zip第三方上传地址
  getZipUploadUrl: (params) => {
    return fetch({
      method: 'post', // 请求方式
      prefix: 'JeemaaPortalManage', // 前缀
      url: `/${window.$Prefix}/projectManager/getZipUploadUrl`, // 请求地址
      data: qs.stringify(params)
    })
  },
  // 通知后端推送解压文件列表
  getZipDocList: (params) => {
    return fetch({
      method: 'post', // 请求方式
      prefix: 'JeemaaPortalManage', // 前缀
      url: `/${window.$Prefix}/projectManager/getZipDocList`, // 请求地址
      data: qs.stringify(params)
    })
  },
  // 获取zip解压文件第三方上传地址
  getZipUploadUrlList: (params) => {
    return fetch({
      method: 'post', // 请求方式
      prefix: 'JeemaaPortalManage', // 前缀
      url: `/${window.$Prefix}/projectManager/getZipUploadUrlList`, // 请求地址
      data: qs.stringify(params)
    })
  },
  // 获取Map语言对列表
  getLangPinyinMap: (params) => {
    return fetch({
      method: 'get', // 请求方式
      prefix: 'OrderPortalFront', // 前缀
      url: `/frame/getFullPinyinMap`, // 请求地址
      params
    })
  },
  // 获取领域列表
  getLabelList: (params) => {
    return fetch({
      method: 'get', // 请求方式
      prefix: 'OrderPortalFront', // 前缀
      url: `/frame/getLabelList`, // 请求地址
      params
    })
  },
  // 注销登录
  loginOut: (params) => {
    return fetch({
      method: 'post', // 请求方式
      prefix: 'OrderPortalFront', // 前缀
      url: '/user/loginOut', // 请求地址
      data: params
    })
  },
  // 获取公共资源地址
  resourcePath: (params) => {
    return fetch({
      method: 'get', // 请求方式
      prefix: 'OrderPortalFront', // 前缀
      url: '/frame/resourcePath', // 请求地址
      params
    })
  },
  // 获取Map语言对列表
  getLanguageList: (params) => {
    return fetch({
      method: 'get', // 请求方式
      prefix: 'OrderPortalFront', // 前缀
      url: `/frame/getLanguageList`, // 请求地址
      params
    })
  },
  // 修改密码
  changePasswd: (params) => {
    return fetch({
      method: 'post', // 请求方式
      prefix: 'OrderPortalFront', // 前缀
      url: '/user/changePasswd', // 请求地址
      data: qs.stringify(params)
    })
  },
  // 修改手机号
  changePhone: (params) => {
    return fetch({
      method: 'post', // 请求方式
      prefix: 'OrderPortalFront', // 前缀
      url: '/user/changePhone', // 请求地址
      data: qs.stringify(params)
    })
  },
  // 修改绑定信息
  changeBind: (params) => {
    return fetch({
      method: 'post', // 请求方式
      prefix: 'OrderPortalFront', // 前缀
      url: '/user/changeBind', // 请求地址
      data: qs.stringify(params)
    })
  },
  // 获取图片验证码
  generatePic: (params) => {
    const query = qs.stringify(params)
    return `${BaseUrl['OrderPortalFront']}/frame/generatePic?${query}`
  },
  // 发送登录验证码
  sendYZCode: (params) => {
    return fetch({
      method: 'post', // 请求方式
      prefix: 'OrderPortalFront', // 前缀
      url: '/frame/sendYZCode', // 请求地址
      data: qs.stringify(params)
    })
  },
  dingtalkAuth: (params) => {
    return fetch({
      method: 'get', // 请求方式
      prefix: 'OrderPortalFront', // 前缀
      url: 'listener/dingtalkAuth', // 请求地址
      params
    })
  },
  // 发送邮箱验证码
  sendBindMail: (params) => {
    return fetch({
      method: 'post', // 请求方式
      prefix: 'OrderPortalFront', // 前缀
      url: 'user/sendBindMail', // 请求地址
      data: qs.stringify(params)
    })
  },
  // 修改邮箱
  changeMail: (params) => {
    return fetch({
      method: 'post', // 请求方式
      prefix: 'OrderPortalFront', // 前缀
      url: 'user/changeMail', // 请求地址
      data: qs.stringify(params)
    })
  },
  // 解绑
  removeBind: (params) => {
    return fetch({
      method: 'post', // 请求方式
      prefix: 'OrderPortalFront', // 前缀
      url: 'user/removeBind', // 请求地址
      data: qs.stringify(params)
    })
  }
}

export default CommonApi
