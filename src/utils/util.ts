/*
 * @Description: 工具包
 * @Author: chenxin
 * @Date: 2020-09-22 16:11:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-10-19 17:09:20
 */
import CryptoJS from 'crypto-js'
import SparkMD5 from 'spark-md5'
import { isArray, isObject } from '@vue/shared'

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
    padding: CryptoJS.pad.Pkcs7
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
    padding: CryptoJS.pad.Pkcs7
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
    padding: CryptoJS.pad.Pkcs7
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
    padding: CryptoJS.pad.Pkcs7
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
          height: image.height
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
    if (params[key] == 0 || (params[key] != '' && params[key] != undefined && params[key] != null)) {
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

// 过滤非法字符
export const filterIllegalChar = (str: string) => {
  const keys = str.match(/[#%\\*\\+\\|\\\\<>\\/?()]/gi)
  if (keys && keys.length) {
    keys.map((item) => {
      str = str.replaceAll(item, '')
    })
  }
  return str
}

// 生成uuid
export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// token
export const getToken = (): string | undefined => {
  const loginInfo = getLoginInfo()
  return loginInfo?.token
}

// 获取用户信息
export const getLoginInfo = (): StoreState.ILoginInfo | undefined => {
  let loginInfo: any = localStorage.getItem('clientLoginInfo')
  if (loginInfo) {
    loginInfo = JSON.parse(loginInfo)
    return loginInfo
  }
}

//全文单词首字母大写
export const replaceFirstUpper = (str: string) => {
  str = str.toLowerCase()
  return str.replace(/\b(\w)|\s(\w)/g, (m) => {
    return m.toUpperCase()
  })
}

//全文句段首字母大写
export const replaceFirstLower = (str: string) => {
  str = str.toLowerCase()
  return str.replace(/[a-zA-Z]/, (m, index) => {
    return str[index].toUpperCase()
  })
}

// 格式化文本
export const reverse = (str: string) => {
  return str && str.replace(/【0jeemaa0】/g, '&lt').replace(/【1jeemaa1】/g, '&gt')
}

// 下载文件，修改文件名
export const downloadFileOfOriginalName = (url: any, filename: any, file: any, isStream: any, decode: any) => {
  return new Promise((resolve, reject) => {
    /**
     * 保存
     * @param  {Blob} blob
     * @param  {String} name 想要保存的文件名称
     */
    const saveAs = (blob: any, name: any) => {
      if ((window.navigator as any).msSaveOrOpenBlob) {
        ;(navigator as any).msSaveBlob(blob, name)
      } else {
        const newUrl = window.URL.createObjectURL(blob)

        downloadFileInCurrentWindow(newUrl, name)

        window.URL.revokeObjectURL(newUrl)
        resolve(true)
      }
    }

    /**
     * 获取 blob
     * @param  {String} url 目标文件地址
     * @return {Promise}
     */
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'blob'
    if (isStream) {
      xhr.setRequestHeader('token', localStorage.getItem('CNPAT_TOKEN') as string)
    }
    xhr.onprogress = (res) => {
      if (file) {
        file.downStatusText = '文件下载中...'
      }
    }
    xhr.onload = (res) => {
      let newFilename = filename
      if (isStream) {
        const disposition = xhr.getResponseHeader('Content-Disposition')
        if (disposition && disposition.indexOf('filename') !== -1) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
          const matches = filenameRegex.exec(disposition)
          if (matches != null && matches[1]) {
            newFilename = matches[1].replace(/['"]/g, '')
            // 需要UTF-8转码
            if (decode) {
              newFilename = decodeURI(newFilename)
            }
          }
        }
      }
      saveAs(xhr.response, newFilename)
      if (file) {
        file.downStatusText = '已下载'
      }
    }
    xhr.onerror = (res) => {
      if (file) {
        file.downStatusText = '下载失败'
      }
      reject(res)
    }

    xhr.send()
  })
}
// 当前窗口下载文件
export const downloadFileInCurrentWindow = (url: any, fileName?: any) => {
  let fileType = url.split('.').pop()
  fileType = fileType.split('?').shift()
  let name = url.split('/').pop()
  name = name.split('?').shift()
  const aTag = document.createElement('a')
  if (fileType && (fileType.toLowerCase() === 'txt' || fileType.toLowerCase() === 'xml')) {
    aTag.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(url))
  } else {
    aTag.setAttribute('href', url)
  }
  aTag.setAttribute('download', fileName || name)
  if (getBrowser() === 'Chrome') {
    aTag.target = '_blank'
  }
  // fix Firefox
  aTag.style.display = 'none'
  document.body.appendChild(aTag)
  aTag.click()
  document.body.removeChild(aTag)
}

// 判断浏览器
export const getBrowser = () => {
  const ua = navigator.userAgent.toLocaleLowerCase()
  let Browser = null
  if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
    Browser = 'IE'
  } else if (ua.match(/firefox/) != null) {
    Browser = 'FF' // 火狐
    return 'FF'
  } else if (ua.match(/ubrowser/) != null) {
    Browser = 'UC'
    return 'UC'
  } else if (ua.match(/opera/) != null) {
    Browser = 'OP' // 欧朋
    return 'OP'
  } else if (ua.match(/bidubrowser/) != null) {
    Browser = 'baidu'
    return 'baidu'
  } else if (ua.match(/metasr/) != null) {
    Browser = 'SG' // 搜狗
    return 'SG'
  } else if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
    Browser = 'QQ'
    return 'QQ'
  } else if (ua.match(/maxthon/) != null) {
    Browser = 'AY' // 遨游
  } else if (ua.match(/chrome/) != null) {
    // 360或者chrome
    Browser = 'Chrome'
  } else if (ua.match(/safari/) != null) {
    Browser = 'Safari'
  }
  return Browser
}

//获取浏览器信息
export const getPosType = () => {
  const agent = navigator.userAgent.toLowerCase()
  const isMac = /macintosh|mac os x/i.test(navigator.userAgent)
  if (agent.indexOf('win32') >= 0 || agent.indexOf('wow32') >= 0) {
    console.log('这是windows32位系统')
    return 'Window32'
  }
  if (agent.indexOf('win64') >= 0 || agent.indexOf('wow64') >= 0) {
    console.log('这是windows64位系统')
    return 'Window64'
  }
  if (isMac) {
    console.log('这是mac系统')
    return 'Mac'
  }
}

// 判断操作系统信息
export const getOSType = () => {
  if (/(Android)/i.test(navigator.userAgent)) {
    console.log('Android')
    return 'Android'
  } else if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    console.log('ios')
    return 'Ios'
  }
}

// 判断当前环境是否是微信环境
export const isWeixin = () => {
  const ua: any = navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true
  } else {
    return false
  }
}

// 判断文本是否超出dom宽度
export const textRange = (el: any) => {
  if (el) {
    const textContent = el
    const targetW = textContent.getBoundingClientRect?.()?.width
    const range = document.createRange()
    range.setStart(textContent, 0)
    range.setEnd(textContent, textContent.childNodes.length)
    const rangeWidth = range.getBoundingClientRect?.()?.width
    return rangeWidth > targetW
  } else {
    return false
  }
}

// 设置全局主题
export const setTheme = (theme: string) => {
  // 设置全局主题
  document.documentElement.setAttribute('theme', theme)
}

// 根据传入的文档类型，返回图标html
export const getDocTypeIcon = (fileName: string) => {
  const fileType = (fileName && fileName.split('.')[fileName.split('.').length - 1]) || ''
  let iconSymbolName = ''
  // a-z顺序排列
  switch (fileType.toLowerCase()) {
    // icon名与后缀名不一致
    case 'doc':
    case 'docx':
      iconSymbolName = 'icon-word'
      break
    case 'dxf':
      iconSymbolName = 'icon-dwg'
      break
    case 'wps':
      iconSymbolName = 'icon-WPS'
      break
    case 'eml':
      iconSymbolName = 'icon-eml'
      break
    case 'jpg':
    case 'jpeg':
      iconSymbolName = 'icon-jpg'
      break
    case 'mif':
      iconSymbolName = 'icon-Mif'
      break
    case 'odg':
      iconSymbolName = 'icon-Odg'
      break
    case 'ods':
      iconSymbolName = 'icon-Ods'
      break
    case 'ppt':
    case 'pptx':
      iconSymbolName = 'icon-ppt1'
      break
    case 'srt':
      iconSymbolName = 'icon-Srt'
      break
    case 'stc':
      iconSymbolName = 'icon-Stc'
      break
    case 'std':
      iconSymbolName = 'icon-Stc'
      break
    case 'sxc':
      iconSymbolName = 'icon-Sxc'
      break
    case 'txt':
    case 'moc':
      iconSymbolName = 'icon-TXT'
      break
    case 'vsdx':
      iconSymbolName = 'icon-Vsdx'
      break
    case 'xls':
    case 'xlsx':
      iconSymbolName = 'icon-excel'
      break
    case 'htm':
      iconSymbolName = 'icon-html'
      break
    case 'sxi':
    case 'xml':
    case 'json':
    case 'xlf':
      iconSymbolName = 'icon-' + fileType.toLowerCase() + '1'
      break
    // icon名与后缀名一致
    case 'csv':
    case 'dtd':
    case 'dwg':
    case 'html':
    case 'idml':
    case 'md':
    case 'odt':
    case 'otp':
    case 'ots':
    case 'ott':
    case 'pdf':
    case 'php':
    case 'png':
    case 'po':
    case 'properties':
    case 'rtf':
    case 'sdlxliff':
    case 'sti':
    case 'stw':
    case 'sxd':
    case 'sxw':
    case 'txml':
    case 'xliff':
    case 'xmap':
    case 'xmind':
    case 'yaml':
    case 'yml':
      iconSymbolName = 'icon-' + fileType.toLowerCase()
      break
    default:
      iconSymbolName = 'icon-buzhichi'
      break
  }
  return '<svg class="icon" aria-hidden="true"><use xlink:href="#' + iconSymbolName + '"></use></svg>'
}

// 自动化批量导入国际化文件
export const autoImportI18n = (context: any, key: string) => {
  return context.keys().reduce((obj: { [key: string]: any }, item: string) => {
    // 获取文件名
    const fileName = item.replace(/(.*\/)*([^.]+).*/gi, '$2')
    const value = context(item).default || context(item)
    obj[fileName] = value[key]
    return obj
  }, {})
}

//加密显示手机号
export const EncryptedPhone = (num: string) => {
  return num.replace(/(\d{3})\d*(\d{4})/, '$1****$2')
}

// 清除登录信息
export const clearLoginInfo = () => {
  localStorage.removeItem('clientLoginInfo')
  window.$ParentRouter.push('/login')
}

// 判断是否为空
export const isEmpty = (val: unknown) => (!val && val !== 0) || (isArray(val) && val.length === 0) || (isObject(val) && !Object.keys(val).length)

// 数组转对象
export const arrayConvertObject = <T>(lists: T & { value: string | number; label: string }[]) => {
  return lists.reduce((data, item) => {
    data[item.value] = item.label
    return data
  }, {} as { [key: string]: string })
}
