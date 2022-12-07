/**
 * 接口返回结果Types
 * --------------------------------------------------------------------------
 */
// 角色列表返回结果
export interface ISysListsData {}

/**
 * 接口参数Types
 * --------------------------------------------------------------------------
 */
// 新增菜单参数
export interface IAddSysMenu {
	guid?: string
	parentGuid?: string //父级部门
	name: string //部门名称
	functionType: string // 菜单类型
	orderNum: string | Number // 序号
	[key: string]: any
}
// 菜单列表
export interface ISysMenuParams {
	pageNo: number
	pageSize: number
	functionType?: string
	name?: string
	parentGuid?: string
}

/**
 * 接口定义Types
 * --------------------------------------------------------------------------
 */
export interface IMenuApi {
	addSysMenu: (params: IAddSysMenu) => Promise<StoreState.ResType<any>>
	getMenuPage: (params: ISysMenuParams) => Promise<StoreState.ResPage<any>>
	updateSysMenu: (params: IAddSysMenu) => Promise<StoreState.ResType<any>>
	delSysMenu: (params: { guidComma: string }) => Promise<StoreState.ResType<any>>
}
