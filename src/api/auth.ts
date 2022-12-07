import fetch from '@/utils/fetch'
import qs from 'qs'
import { IAuthApi } from './types/auth'

const AuthApi: IAuthApi = {
	// 新增角色
	addSysRole: params => {
		return fetch({
			method: 'post',
			url: '/sysRoleInfo/add',
			data: qs.stringify(params)
		})
	},
	// 角色列表
	getRolePage: params => {
		return fetch({
			method: 'post',
			url: '/sysRoleInfo/getPage',
			data: qs.stringify(params)
		})
	},
	// 修改角色信息
	updateSysRole: params => {
		return fetch({
			method: 'post',
			url: '/sysRoleInfo/edit',
			data: qs.stringify(params)
		})
	},
	// 删除角色信息
	delSysRole: params => {
		return fetch({
			method: 'post',
			url: '/sysRoleInfo/delete',
			data: qs.stringify(params)
		})
	}
}

export default AuthApi
