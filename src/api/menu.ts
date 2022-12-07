import fetch from '@/utils/fetch'
import qs from 'qs'
import { IMenuApi } from './types/menu'

const MenuApi: IMenuApi = {
	// 新增菜单
	addSysMenu: params => {
		return fetch({
			method: 'post',
			url: '/sysFunctionInfo/add',
			data: qs.stringify(params)
		})
	},
	// 菜单列表
	getMenuPage: params => {
		return fetch({
			method: 'post',
			url: '/sysFunctionInfo/getPage',
			data: qs.stringify(params)
		})
	},
	// 修改菜单信息
	updateSysMenu: params => {
		return fetch({
			method: 'post',
			url: '/sysRoleInfo/edit',
			data: qs.stringify(params)
		})
	},
	// 删除菜单信息
	delSysMenu: params => {
		return fetch({
			method: 'post',
			url: '/sysRoleInfo/delete',
			data: qs.stringify(params)
		})
	}
}

export default MenuApi
