//封装table组件公共方法
import { Ref, ref, onMounted, toRefs, reactive } from 'vue'
import { Pagination } from '@/utils/const'
import { Modal } from 'ant-design-vue'
import { Message, Notification } from '@/utils/resetMessage'

type TableParams<IParams, IResData> = {
	FetchApi: {
		queryApi: (params: IParams) => Promise<StoreState.ResPage<IResData>>
		deleteApi: (params: any) => Promise<StoreState.ResType<any>>
	}
	queryParams: IParams
}

export function TableFuns<T, D>({ FetchApi, queryParams }: TableParams<T, D>) {
	// 列表数据
	const tableData: Ref<D[]> = ref([])
	// 接口请求状态
	const loading: Ref<boolean> = ref(false)
	// table勾选项key
	const selectRowKeys: Ref<(string | number)[]> = ref([])
	// table勾选项
	const selectRows: Ref<D[]> = ref([])
	// 分页构造器
	const pagination: StoreState.Pagination = reactive(new Pagination({}).init())

	onMounted(() => {
		query()
	})

	// 分页查询
	const query = async (params = {}) => {
		Object.assign(queryParams, params)
		loading['value'] = true
		try {
			const { data } = await FetchApi['queryApi'](queryParams)
			tableData['value'] = data['records']
			pagination.current = data['current']
			pagination.total = data['total']
			pagination.pageSize = data['size']
			loading['value'] = false
		} catch (error) {
			loading['value'] = false
		}
	}

	// 批量删除
	const batchHandleDetele = (deteleParams: any) => {
		if (!selectRowKeys['value'].length) {
			Message.warning('请选择要删除的数据！')
			return
		}
		handleDetele(deteleParams)
	}

	// 删除确认
	const handleDetele = (deleteParams: any) => {
		Modal.confirm({
			title: '确定进行[删除]操作?',
			okText: '确定',
			class: 'my-modal',
			cancelText: '取消',
			onOk: async () => {
				onDetele(deleteParams)
			},
			onCancel: () => {
				console.log('Cancel')
			}
		})
	}

	// 开始删除
	const onDetele = async (deleteParams: any) => {
		try {
			await FetchApi['deleteApi'](deleteParams)
			const { pageNo } = queryParams as any
			if (tableData['value'].length == 1) {
				;(queryParams as any).pageNo = pageNo - 1 <= 0 ? 1 : pageNo - 1
			}
			query()
		} catch (error) {}
	}

	// 切换分页
	const tableChange = (pagination: StoreState.Pagination) => {
		;(queryParams as any).pageNo = pagination.current as number
		query()
	}

	// rowSelectio勾选
	const selectChange = (selectedRowKeys: Array<string | number>, selectedRows: D[]) => {
		selectRowKeys['value'] = selectedRowKeys
		selectRows['value'] = selectedRows
	}

	return {
		query,
		tableChange,
		selectChange,
		handleDetele,
		batchHandleDetele,
		selectRows,
		selectRowKeys,
		tableData,
		loading,
		pagination
	}
}
