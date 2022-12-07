/**
 * 接口返回结果Types
 * --------------------------------------------------------------------------
 */
// 登录返回结果
export interface ILoginData {
  token: string
  userInfo: {
    address: string
    username: string
  }
}
// 字典接口返回结果
export interface IDictData {
  guid: string //主键
  typeCode: string // 字典类型编码
  code: string //字典编码
  dictName: string // 字典值
  orderNum: number // 排序
  mark: string // 备注
  createTime: string // 创建时间
}

/**
 * 接口参数Types
 * --------------------------------------------------------------------------
 */
// 登录参数
export interface ILoginApiParams {
  username: string // 用户名
  password: string // 密码
  captcha: string // 验证码
  uuid: string // 验证码uuid
}
// 注销登录参数
export interface ILogoutParams { }
// 获取用户权限参数
export interface IPermissionsParams { }
// 字典请求分页参数
export interface IDictParams {
  pageNo: number
  pageSize: number
  typeCode: string
}

/**
 * 接口定义Types
 * --------------------------------------------------------------------------
 */
export interface IUserApi {
  login: (params: ILoginApiParams) => Promise<StoreState.ResType<ILoginData>>
  logout: (params: ILogoutParams) => Promise<StoreState.ResType<any>>
  getPermissionsList: (params: IPermissionsParams) => Promise<StoreState.ResType<any>>
  getPage: (params: IPermissionsParams) => Promise<StoreState.ResType<any>>
  deleteUser: (params: IPermissionsParams) => Promise<StoreState.ResType<any>>
  getTree: (params: IPermissionsParams) => Promise<StoreState.ResType<any>>
  addUser: (params: IPermissionsParams) => Promise<StoreState.ResType<any>>
  editUser: (params: IPermissionsParams) => Promise<StoreState.ResType<any>>
}
