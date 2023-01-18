import fetch from '@/utils/fetch'
import qs from 'qs'
import { IDepartApi } from './types/depart'

const DepartApi: IDepartApi = {
	// 新增部门
	addSysDepart: params => {
		return fetch({
			method: 'post',
			url: '/organization/add',
			data: params
		})
	},
	// 修改部门信息
	updateSysDepart: params => {
		return fetch({
			method: 'post',
			url: '/organization/edit',
			data: params
		})
	},
	// 删除部门
	deleteSysDepart: params => {
		return fetch({
			method: 'post',
			url: '/organization/delete',
			params
		})
	}
}

export default DepartApi
