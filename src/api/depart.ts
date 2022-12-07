import fetch from '@/utils/fetch'
import qs from 'qs'
import { IDepartApi } from './types/depart'

const DepartApi: IDepartApi = {
	// 新增部门
	addSysDepart: params => {
		return fetch({
			method: 'post',
			url: '/sysOrgInfo/add',
			data: qs.stringify(params)
		})
	},
	// 修改部门信息
	updateSysDepart: params => {
		return fetch({
			method: 'post',
			url: '/sysOrgInfo/edit',
			data: qs.stringify(params)
		})
	},
	// 删除部门
	deleteSysDepart: params => {
		return fetch({
			method: 'post',
			url: '/sysOrgInfo/delete',
			data: qs.stringify(params)
		})
	},
	// 查询部门列表
	getSysDepart: params => {
		return fetch({
			method: 'post',
			url: '/sysOrgInfo/getList',
			data: qs.stringify(params)
		})
	}
}

export default DepartApi
