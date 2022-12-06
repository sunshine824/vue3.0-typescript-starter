/*
 * @Description: 工具包
 * @Author: chenxin
 * @Date: 2020-09-22 16:11:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-16 23:13:56
 */

import CryptoJS from 'crypto-js'
import SparkMD5 from 'spark-md5'

const PublicKey = 'ZHONGGUODIANWANG'
const IvKey = 'ZHONGGUODIANWANG'

/**
 * URL地址
 * @param {*}s
 */
export const isURL = (s: string): boolean => /^http[s]?:\/\/.*/.test(s)

/**
 * 验证密码强度
 * @param value
 */
export const checkPassModes = (value: string): number => {
  let modes = 0
  // 正则表达式验证符合要求的
  if (value.length < 1) return modes
  if (/\d/.test(value)) modes++ // 数字
  if (/[a-z]/.test(value)) modes++ // 小写
  if (/[A-Z]/.test(value)) modes++ // 大写
  if (/\W/.test(value)) modes++ // 特殊字符
  return modes
}

/**
 * 判断是否是IE
 */
export const isIE = () => {
  const bw = window.navigator.userAgent
  const compare = (s: string) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/*
 * ECB加密
 * @param  {String}     word    需要加密的密码
 * @param  {String}     keyStr    对密码加密的秘钥
 * @return {String}     加密的密文
 * */
export const ECBEncrypt = (word: string | number, keyStr?: string) => {
  keyStr = keyStr || PublicKey
  word = typeof word != 'string' ? word.toString() : word
  const key = CryptoJS.enc.Utf8.parse(keyStr)
  const encryptedData = CryptoJS.AES.encrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  })
  return encryptedData.toString()
}

/*
 * ECB解密
 * @param  {String}     word    需要加密的密码
 * @param  {String}     keyStr    对密码加密的秘钥
 * @return {String}      解密的明文
 * */
export const ECBDecrypt = (word: string | number, keyStr?: string) => {
  keyStr = keyStr || PublicKey
  word = typeof word == 'number' ? word.toString() : word
  const key = CryptoJS.enc.Utf8.parse(keyStr)
  const encryptedHexStr = CryptoJS.enc.Base64.parse(word)
  const encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  const decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  })
  return decryptedData.toString(CryptoJS.enc.Utf8)
}

/*
 * CBC加密
 * @param  {String}     word    需要加密的密码
 * @param  {String}     keyStr    对密码加密的秘钥
 * @return {String}     加密的密文
 * */
export const CBCEncrypt = (word: string | number, keyStr?: string) => {
  keyStr = keyStr || PublicKey
  word = typeof word == 'number' ? word.toString() : word
  const key = CryptoJS.enc.Utf8.parse(keyStr)
  const iv = CryptoJS.enc.Utf8.parse(IvKey)

  const srcs = CryptoJS.enc.Utf8.parse(word)
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}

/*
 * CBC解密
 * @param  {String}     word    需要加密的密码
 * @param  {String}     keyStr    对密码加密的秘钥
 * @return {String}      解密的明文
 * */
export const CBCDecrypt = (word: string | number, keyStr?: string) => {
  keyStr = keyStr || PublicKey
  word = typeof word == 'number' ? word.toString() : word
  const key = CryptoJS.enc.Utf8.parse(keyStr)
  const iv = CryptoJS.enc.Utf8.parse(IvKey)

  const encryptedHexStr = CryptoJS.enc.Base64.parse(word)
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  const decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}

/**
 * 获取上传文件md5
 * @param {*} dataFile
 */
export const getUploadFileMd5 = (dataFile: Blob) =>
  new Promise((resolve) => {
    const fileReader = new FileReader()
    const spark = new SparkMD5.ArrayBuffer()
    // 获取文件二进制数据
    fileReader.readAsArrayBuffer(dataFile)
    fileReader.onload = (e: ProgressEvent) => {
      spark.append((e.target as any).result)
      const md5 = spark.end()
      return resolve(ECBEncrypt(md5))
    }
  })

/**
 * 获取上传图片base64
 * @param file
 */
export const getFileBase64 = (file: Blob) =>
  new Promise((resolve, reject) => {
    const fileReader: any = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      const image = new Image()
      image.src = fileReader.result
      image.onload = () =>
        resolve({
          base64: fileReader.result,
          width: image.width,
          height: image.height,
        })
    }
    fileReader.onerror = (error: any) => reject(error)
  })

/**
 * 创建formData参数(只针对有图片上传)
 * @param {*} params
 */
export function createdFormData(params: any) {
  const formData = new FormData()
  Object.keys(params).forEach((key) => {
    if (
      params[key] == 0 ||
      (params[key] != '' && params[key] != undefined && params[key] != null)
    ) {
      if (params[key] instanceof Array) {
        params[key].forEach((item: any) => {
          formData.append(`${key}[]`, item)
        })
      } else {
        formData.append(key, params[key])
      }
    }
  })
  return formData
}

// 判断某个dom元素是否包含在另一个dom元素中
export const contains = (parent: any, node: any) => {
  parent !== node && parent.contains(node)
}

// 格式化边界点位数据为二维数组
export const formatPolylinePoint = (polyline: any) => {
  const arr: any = []
  polyline?.split(';').map((item: any) => {
    const point = item.split(',').map(Number)
    const flag = point.includes(NaN)
    if (!flag) {
      arr.push(point)
    }
  })
  return arr
}

// 生成uuid
export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// token
export const getToken = () => {
  const common = JSON.parse(localStorage.getItem('common') as string)
  return common?.userInfo?.token
}

// 获取用户信息
export const getUserInfo = () => {
  const common = JSON.parse(localStorage.getItem('common') as string)
  return common?.userInfo?.userInfo
}
