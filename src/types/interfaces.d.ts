/*
 * @Description:
 * @Author: chenxin
 * @Date: 2020-09-22 16:11:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-27 10:09:24
 */
declare namespace StoreState {
  // 接口返回结构
  export interface ResType<T> {
    code: number
    data: T
    msg?: string
    status: boolean
  }

  // 接口分页返回结构
  export interface ResPage<T> {
    code: number
    data: {
      records: T[] //列表数据
      total: number //总条数
      size: number // 每页显示条数
      current: number // 当前页面
      pages: number // 总共页数
    }
    msg?: string
    status: boolean
  }

  // 请求参数结构
  export interface FetchParams {
    url: string
    data: object | string
    [propName: string]: any
  }

  // 权限返回实体
  export interface Role {
    icon?: string
    list?: Role[]
    menuId?: number
    name: string
    perms?: string
    requestPath?: string
    url: string
    [propName: string]: any
  }

  // layout布局
  export interface Layout {
    labelCol: {
      span: number
    }
    wrapperCol: {
      span: number
    }
  }

  // 分页参数
  export interface Pagination {
    current?: number
    position?: string
    pageSize?: number
    total?: number
    showQuickJumper?: boolean
    showTotal?: (total: number, range: [number, number]) => any
  }

  // 上传文件
  export interface FileItem {
    uid: string
    name?: string
    status?: string
    response?: string
    url?: string
    type?: string
    size: number
    originFileObj: any
  }

  export interface FileInfo {
    file: FileItem
    fileList: FileItem[]
  }

  // 资源类型
  export interface ResourceTypes {
    '1': string
    '2': string
    '3': string
    [key: string]: string
  }

  // 列表mixin
  export interface TableMixinOptions {
    queryTableApi: ({ }) => any
    deleteApi: ({ }) => any
  }
}
