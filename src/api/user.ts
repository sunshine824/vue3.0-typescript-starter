import qs from 'qs'
import fetch from '@/utils/fetch'
import { IUserApi } from './types/user'

const UserApi: IUserApi = {
	// 登录
	login: params => {
		return fetch({
			method: 'post',
			url: '/login',
			data: params
		})
	},
	// 注销登录
	logout: params => {
		return fetch({
			method: 'get',
			url: '/logout',
			data: params
		})
	},
	// 获取权限列表
	getPermissionsList: params => {
		return fetch({
			method: 'get',
			url: '/navPerson',
			data: qs.stringify(params)
		})
	},
	// 查询分页
	getPage: params => {
		return fetch({
			method: 'post',
			url: '/sysUserInfo/getPage',
			data: qs.stringify(params)
		})
	},
	// 删除用户
	deleteUser: params => {
		return fetch({
			method: 'post',
			url: '/sysUserInfo/delete',
			data: qs.stringify(params)
		})
	},
	// 查询机构树
	getTree: params => {
		return fetch({
			method: 'post',
			url: '/sysOrgInfo/getTree',
			data: qs.stringify(params)
		})
	},
	// 新增用户
	addUser: params => {
		return fetch({
			method: 'post',
			url: '/sysUserInfo/add',
			data: qs.stringify(params)
		})
	},
	// 新增用户
	editUser: params => {
		return fetch({
			method: 'post',
			url: '/sysUserInfo/edit',
			data: qs.stringify(params)
		})
	},
}

export default UserApi
