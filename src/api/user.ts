import fetch from '@/utils/fetch'
import qs from 'qs'
import { IUserApi } from './types/user'

const UserApi: IUserApi = {
  // 登录
  login: (params) =>
    fetch({
      method: 'post',
      url: '/login',
      data: params,
    }),
  // 注销登录
  logout: (params) =>
    fetch({
      method: 'get',
      url: '/logout',
      data: params,
    }),
  // 获取权限列表
  getPermissionsList: (params) =>
    fetch({
      method: 'get',
      url: '/navPerson',
      data: qs.stringify(params),
    }),
}

export default UserApi
