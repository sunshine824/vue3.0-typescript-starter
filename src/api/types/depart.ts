/**
 * 接口返回结果Types
 * --------------------------------------------------------------------------
 */

/**
 * 接口参数Types
 * --------------------------------------------------------------------------
 */
// 新增部门参数
export interface IAddDepartParams {
	guid?: string // id
	parentId: string // 绑定菜单
	name: string // 角色名
	remark: string // 备注
	[key: string]: any
}

/**
 * 接口定义Types
 * --------------------------------------------------------------------------
 */
export interface IDepartApi {
	addSysDepart: (params: IAddDepartParams) => Promise<StoreState.ResType<any>>
	updateSysDepart: (params: IAddDepartParams) => Promise<StoreState.ResType<any>>
	deleteSysDepart: (params: { guid: string }) => Promise<StoreState.ResType<any>>
}
