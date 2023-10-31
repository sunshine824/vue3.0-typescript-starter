import mitt from 'mitt'
import { uuid, arrayConvertObject } from './util'

// 定义分页类
export class Pagination {
  private Page: StoreState.Pagination = {
    position: 'bottom',
    currentPage: 1,
    pageSize: 10,
    total: 0,
    showTotal: (total: number) => `总 ${total} 条`
  }

  constructor(params?: StoreState.Pagination) {
    Object.assign(this.Page, params)
  }

  init() {
    return this.Page
  }
}

// modal公共属性
export const modalProps = {
  maskClosable: false
}

// 跨组建通信（类似EventBus）
export const $mitt = mitt()

// 注册事件总站
export const $bus = {
  emit: <T>(key: string, params?: T) => {
    $mitt.emit(key, params)
  },
  on: (key: string, func: any) => {
    $mitt.off(key)
    $mitt.on(key, func)
  },
  off: (key: string) => {
    $mitt.off(key)
  }
}

// 单独导航显示黑名单
export const MenuBlackList = ['/login', '/register']

// 文件上传支持格式
export const FileFormatSupport = [
  'doc',
  'docx',
  'zip',
  'moc',
  'pst',
  'rtf',
  'xls',
  'xlsx',
  'ppt',
  'pptx',
  'dwg',
  'dxf',
  'sdlxliff',
  'vsdx',
  'xmind',
  'pdf',
  'txt',
  'html',
  'xmap',
  'yml',
  'yaml',
  'xml',
  'json',
  'mif',
  'properties',
  'po',
  'dtd',
  'txml',
  'xlf',
  'csv',
  'idml',
  'htm',
  'md',
  'ods',
  'ots',
  'odg',
  'otp',
  'odt',
  'ott',
  'srt',
  'sxw',
  'stw',
  'sxi',
  'sti',
  'sxc',
  'stc',
  'sxd',
  'std',
  'php',
  'jpg',
  'jpeg',
  'png',
  'wps',
  'eml'
]

// 文件分类
interface IFileClassify {
  file: string[]
  voice: string[]
  image: string[]
  video: string[]
  [key: string]: string[]
}
export const FileClassify: IFileClassify = {
  file: [
    'doc',
    'docx',
    'zip',
    'pst',
    'rtf',
    'moc',
    'xls',
    'xlsx',
    'ppt',
    'pptx',
    'dwg',
    'dxf',
    'sdlxliff',
    'vsdx',
    'xmind',
    'pdf',
    'txt',
    'html',
    'xmap',
    'yml',
    'yaml',
    'xml',
    'json',
    'mif',
    'properties',
    'po',
    'dtd',
    'txml',
    'xlf',
    'csv',
    'idml',
    'htm',
    'md',
    'ods',
    'ots',
    'odg',
    'otp',
    'odt',
    'ott',
    'srt',
    'sxw',
    'stw',
    'sxi',
    'sti',
    'sxc',
    'stc',
    'sxd',
    'std',
    'php',
    'wps',
    'eml'
  ],
  voice: ['pcm', 'mp3', 'wav'],
  image: ['jpg', 'jpeg', 'png'],
  video: ['mp4']
}

export const FileImportMsg: { [key: string]: string } = {}

export const TranPurposeLists = [
  { value: 1, label: 'const.text1' },
  { value: 3, label: 'const.text3' },
  { value: 4, label: 'const.text4' },
  { value: 2, label: 'const.text2' },
  { value: 5, label: 'const.text5' }
]

// 翻译用途
export const TranPurpose: { [key: string]: string } = arrayConvertObject(TranPurposeLists)

// 返稿格式
export const DeliveryFiles: { [key: string]: string } = {
  '1': 'onlineOrder.pureTrans',
  '2': 'onlineOrder.originalTranControl',
  '3': 'onlineOrder.tranOriginalControl'
}

// 文件类型
export const FileType: { [key: number]: string } = {
  '1': 'onlineOrder.glossary',
  '2': 'onlineOrder.memoryBank',
  '3': 'onlineOrder.reference'
}
// 订单状态
export const OrderStatus: { [key: string]: { status: string; action: string[]; progressTxt?: string } } = {
  0: {
    status: 'const.text6',
    action: []
  },
  1: {
    status: 'const.text7',
    action: ['cancelOrder', 'downloadOriginal']
  },
  2: {
    status: 'const.text8',
    action: ['confirmOffer', 'cancelOrder', 'downloadOriginal']
  },
  3: {
    status: 'const.text9',
    progressTxt: 'const.text10',
    action: ['payment', 'cancelOrder', 'downloadOriginal']
  },
  4: {
    status: 'const.text11',
    action: ['cancelOrder', 'downloadOriginal']
  },
  5: {
    status: 'const.text12',
    progressTxt: 'const.text13',
    action: ['downloadOriginal']
  },
  6: {
    status: 'const.text14',
    progressTxt: 'const.text15',
    action: ['downloadOriginal']
  },
  7: {
    status: 'const.text16',
    progressTxt: 'const.text17',
    action: ['downloadOriginal']
  },
  8: {
    status: 'const.text18',
    progressTxt: 'const.text19',
    action: ['downloadOriginal']
  },
  9: {
    status: 'const.text20',
    progressTxt: 'const.text21',
    action: ['downloadOriginal']
  },
  10: {
    status: 'const.text22',
    progressTxt: 'const.text23',
    action: ['downloadOriginal']
  },
  11: {
    status: 'const.text24',
    progressTxt: 'const.text25',
    action: ['downloadOriginal']
  },
  12: {
    status: 'const.text26',
    progressTxt: 'const.text27',
    action: ['confirmReceipt', 'downloadOriginal', 'downloadTran']
  },
  13: {
    status: 'const.text28',
    action: ['evaluate', 'downloadOriginal', 'downloadTran']
  },
  14: {
    status: 'const.text29',
    progressTxt: 'const.text29',
    action: ['lookEvaluate', 'downloadOriginal', 'downloadTran']
  },
  15: {
    status: 'const.text31',
    action: ['downloadOriginal', 'cancelReason']
  }
}
export interface TypesettingConfigObj {
  [key: string]: {
    title: string
    key: string
    lists: { [key: number]: string }
  }
}

// 翻译要求默认配置
export const TypesettingConfig: TypesettingConfigObj = {
  // 人名
  name1: {
    title: 'onlineOrder.personalName',
    key: 'name1',
    lists: {
      1: 'onlineOrder.leaveUntranslated',
      2: 'onlineOrder.transcription'
    }
  },
  // 公司名
  name2: {
    title: 'onlineOrder.companyName',
    key: 'name2',
    lists: {
      1: 'onlineOrder.leaveUntranslated',
      2: 'onlineOrder.officialName',
      3: 'onlineOrder.officialName1'
    }
  },
  // 地名
  name3: {
    title: 'onlineOrder.toponym',
    key: 'name3',
    lists: {
      1: 'onlineOrder.leaveUntranslated',
      2: 'onlineOrder.officialName',
      3: 'onlineOrder.officialName1'
    }
  },
  // 图片文字
  picWord: {
    title: 'onlineOrder.pictureText',
    key: 'picWord',
    lists: {
      1: 'onlineOrder.noTranslation',
      2: 'onlineOrder.postText',
      3: 'onlineOrder.plotBelow'
    }
  },
  // 图片文字
  seal: {
    title: 'onlineOrder.seal',
    key: 'seal',
    lists: {
      1: 'onlineOrder.sealShotTextTran',
      2: 'onlineOrder.sealShot',
      3: 'onlineOrder.textTran',
      4: 'onlineOrder.noStamp'
    }
  },
  // 签名
  signature: {
    title: 'onlineOrder.endorsement',
    key: 'signature',
    lists: {
      1: 'onlineOrder.signShotTextTran',
      2: 'onlineOrder.signShot',
      3: 'onlineOrder.textTran',
      4: 'onlineOrder.noReserves'
    }
  },
  // 手写内容
  handwritten: {
    title: 'onlineOrder.handwritten',
    key: 'handwritten',
    lists: {
      1: 'onlineOrder.screenshot',
      2: 'onlineOrder.pdf',
      3: 'onlineOrder.noReserves'
    }
  },
  // 不清楚内容
  noClearContent: {
    title: 'onlineOrder.notKnownVal',
    key: 'noClearContent',
    lists: {
      1: 'onlineOrder.shotRetention',
      2: 'onlineOrder.reasonableGuess'
    }
  },
  // 其他语种
  otherLanguage: {
    title: 'onlineOrder.otherLang',
    key: 'otherLanguage',
    lists: {
      1: 'onlineOrder.shotRetention',
      2: 'onlineOrder.textRotation'
    }
  }
}

// 订单取消原因
export const CancelReasonType: { [key: string]: string } = {
  1: '时间上无法满足',
  2: '字数统计有误差',
  3: '单价高'
}
