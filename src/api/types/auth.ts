/**
 * 接口返回结果Types
 * --------------------------------------------------------------------------
 */
// 角色列表返回结果
export interface ISysListsData {
	name: string // 角色名
	remark: string // 备注
	createTime: string // 创建时间
}

/**
 * 接口参数Types
 * --------------------------------------------------------------------------
 */
// 新增角色参数
export interface IAddSysParams {
	guid?: string // id
	menu: string | [] // 绑定菜单
	name: string // 角色名
	remark: string // 备注
	[key: string]: any
}
// 角色列表
export interface ISysListsParams {
	pageNo: number
	pageSize: number
	name?: string
}

/**
 * 接口定义Types
 * --------------------------------------------------------------------------
 */
export interface IAuthApi {
	addSysRole: (params: IAddSysParams) => Promise<StoreState.ResType<any>>
	getRolePage: (params: ISysListsParams) => Promise<StoreState.ResPage<ISysListsData>>
	updateSysRole: (params: IAddSysParams) => Promise<StoreState.ResType<any>>
	delSysRole: (params: { guidComma: string }) => Promise<StoreState.ResType<any>>
}
