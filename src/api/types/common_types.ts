/*
 * @Author: chenxin
 * @Date: 2023-06-19 15:13:22
 * @Description: 请填写简介
 */
/**
 * 接口返回结果Types
 * --------------------------------------------------------------------------
 */
export interface LoginOutData {}
export interface LabelItem {
  creatorId: number
  creatorType: number
  createTime: string
  updaterId: number
  updaterType: number
  updateTime: string
  isDeleted: number
  atomVersion: number
  id: number
  labelName: string
  parentLabelId: number
  remark: string
  isStatic: number
}
export interface LanguageItem {
  creatorId: string
  creatorType: string
  createTime: string
  updaterId: string
  updaterType: string
  updateTime: string
  isDeleted: string
  atomVersion: string
  id: string
  langCode: string
  langName: string
  langCountry: string
  langArea: string
  orderNumber: string
  cstate: string
  langPinyin: string
  [key: string]: string
}

/**
 * 接口参数Types
 * --------------------------------------------------------------------------
 */
export interface IBleuUploadParams {}
export interface IVoiceUploadParams {}
export interface IVideoUploadParams {}
export interface IPicUploadParams {}
export interface IZipUploadParams {}
export interface IZipDocParams {}
export interface IZipUrlParams {}
export interface ILangMapParams {}
export interface IChangePasswdParams {
  newPass: string
  oldPass: string
}
export interface IChangeBindParams {
  loginMethod: number //1钉钉2微信3支付宝
  token: string
}
export interface ISendVeriParams {
  userPhone: string
  vcode: string
  checkcodeKey: string
}

/**
 * 接口定义Types
 * --------------------------------------------------------------------------
 */
export interface ICommonApi {
  getBleuUploadUrl: (params: IBleuUploadParams) => Promise<StoreState.ResType<any>>
  getVoiceUploadUrl: (params: IVoiceUploadParams) => Promise<StoreState.ResType<any>>
  getVideoUploadUrl: (params: IVideoUploadParams) => Promise<StoreState.ResType<any>>
  getPicUploadUrl: (params: IPicUploadParams) => Promise<StoreState.ResType<any>>
  getZipUploadUrl: (params: IZipUploadParams) => Promise<StoreState.ResType<any>>
  getZipDocList: (params: IZipDocParams) => Promise<StoreState.ResType<any>>
  getZipUploadUrlList: (params: IZipUrlParams) => Promise<StoreState.ResType<any>>
  getLangPinyinMap: (params: ILangMapParams) => Promise<StoreState.ResType<any>>
  getLabelList: (params: {}) => Promise<StoreState.ResType<LabelItem[]>>
  loginOut: (params: any) => Promise<StoreState.ResType<string>>
  resourcePath: (params: any) => Promise<StoreState.ResType<string>>
  getLanguageList: (params: any) => Promise<StoreState.ResType<LanguageItem[]>>
  changePasswd: (params: IChangePasswdParams) => Promise<StoreState.ResType<any>>
  changeBind: (params: IChangeBindParams) => Promise<StoreState.ResType<StoreState.ILoginInfo>>
  generatePic: (params: { checkcode: string }) => string
  sendYZCode: (params: ISendVeriParams) => Promise<StoreState.ResType<any>>
  changePhone: (params: { phone: string; yzmCode: string }) => Promise<StoreState.ResType<any>>
  dingtalkAuth: (params: {}) => Promise<StoreState.ResType<StoreState.ILoginInfo>>
  sendBindMail: (params: { mailAdress: string; vcode: string; checkcodeKey: string }) => Promise<StoreState.ResType<string>>
  changeMail: (params: { mailAdress: string; yzmCode: string }) => Promise<StoreState.ResType<string>>
  removeBind: (params: { loginMethod: string }) => Promise<StoreState.ResType<StoreState.ILoginInfo>>
}
