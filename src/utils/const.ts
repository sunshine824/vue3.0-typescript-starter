// 定义分页类
export class Pagination {
	private Page: StoreState.Pagination = {
		position: 'bottom',
		showQuickJumper: true,
		current: 1,
		pageSize: 10,
		total: 0,
		showTotal: (total: number) => `总 ${total} 条`
	}

	constructor(params?: StoreState.Pagination) {
		Object.assign(this.Page, params)
	}

	init() {
		return this.Page
	}
}

// modal公共属性
export const modalProps = {
	maskClosable: false
}
