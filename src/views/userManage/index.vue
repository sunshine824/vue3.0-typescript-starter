<template>
	<RouteLayout :isSubView="false">
		<div class="user-manage">
			<div class="userBox">
				<div class="treeBox">
					<organ-depart :treeData="treeData" @getTreeMt="getTreeMt" @selectTree="handleSelectTree" />
				</div>
				<AdvancedTable class="tableBox">
					<template #form>
						<a-form class="my-form" layout="inline">
							<a-form-item label="姓名">
								<a-input v-model:value="queryParams.username" placeholder="请输入姓名" />
							</a-form-item>
							<a-form-item>
								<a-button class="mr10" type="primary"
									@click="query({ pageNo: 1, username: queryParams.username, organizationId: '' })">查询</a-button>
								<a-button @click="query({ pageNo: 1, username: '' })">重置</a-button>
							</a-form-item>
						</a-form>
					</template>
					<template #btns>
						<a-button type="primary" @click="showDictModel({ organizationId: queryParams.organizationId })">
							<template #icon>
								<PlusOutlined />
							</template>
							新增人员
						</a-button>
					</template>
					<template #table>
						<a-table class="my-table" :loading="loading" :row-key="record => record.guid" :row-selection="{
	selectedRowKeys: selectRowKeys,
	onChange: selectChange
}" @change="tableChange" :pagination="pagination" :columns="columns" :data-source="tableData" :scroll="{ x: '100%' }">
							<template #bodyCell="{ column, record, index }">
								<template v-if="column.key == 'index'">
									<span>{{ index + 1 }}</span>
								</template>
								<template v-if="column.key == 'sex'">
									<span>{{ record.sex ? '男' : '女' }}</span>
								</template>
								<template v-if="column.key == 'birthday'">
									<span>{{ formatDate(record.birthday) }}</span>
								</template>
								<template v-if="column.key == 'operation'">
									<a href="#" @click="handleDetail(record)">详情</a>
									<a-divider type="vertical" />
									<a href="#" @click="handleDetele({ guidComma: record.guid })">删除</a>
								</template>
							</template>
						</a-table>
					</template>
				</AdvancedTable>
			</div>
			<!-- 新增编辑字典 -->
			<user-form-model ref="dictFormRef" :treeData="treeData"
				@getList="query({ pageNo: 1, username: '', organizationId: '' })"></user-form-model>
		</div>
	</RouteLayout>
</template>

<script setup lang="ts">
import { RouteLayout } from '@/layouts'
import { reactive, ref, onMounted, computed } from 'vue'
import { TableFuns } from '@/mixins/tableFuns'
import { PlusOutlined } from '@ant-design/icons-vue'
import moment from 'moment'
import AdvancedTable from '@/components/AdvancedTable.vue'
import OrganDepart from './components/organDepart.vue'
import UserFormModel from './model/userFormModel.vue'
import userApi from '@/api/user'

const FetchApi = {
	queryApi: userApi.getPage,
	deleteApi: userApi.deleteUser
} // 请求接口
const treeData = ref<any>([])
const queryParams = reactive({ pageNo: 1, pageSize: 10, username: '', organizationId: '' }) // 请求列表参数
const dictFormRef = ref<null | InstanceType<typeof UserFormModel>>(null) // 定义新增编辑字典ref

// 引入table公共逻辑
const { tableData, loading, pagination, selectRowKeys, query, tableChange, selectChange, handleDetele } = TableFuns({ FetchApi, queryParams })
const columns = [
	{
		title: '序号',
		dataIndex: 'index',
		key: 'index',
		align: 'center',
		width: 100,
		ellipsis: true,
		fixed: true
	},
	{
		title: '姓名',
		align: 'center',
		dataIndex: 'username',
		key: 'username',
		width: 100,
		ellipsis: true,
		fixed: true
	},
	{
		title: '出生日期',
		align: 'center',
		dataIndex: 'birthday',
		width: 150,
		ellipsis: true,
		key: 'birthday'
	},
	{
		title: '性别',
		align: 'center',
		dataIndex: 'sex',
		width: 100,
		ellipsis: true,
		key: 'sex'
	},
	{
		title: '手机号',
		align: 'center',
		dataIndex: 'phone',
		width: 200,
		ellipsis: true,
		key: 'phone'
	},
	{
		title: '所属部门',
		align: 'center',
		dataIndex: 'orgusername',
		width: 120,
		ellipsis: true,
		key: 'orgusername'
	},
	{
		title: '所属角色',
		align: 'center',
		dataIndex: 'role',
		width: 100,
		ellipsis: true,
		key: 'role'
	},
	{
		title: '邮箱',
		align: 'center',
		dataIndex: 'email',
		width: 200,
		ellipsis: true,
		key: 'email'
	},
	{
		title: '创建时间',
		align: 'center',
		dataIndex: 'createTime',
		key: 'createTime',
		width: 200,
		ellipsis: true
	},
	{
		title: '操作',
		align: 'center',
		key: 'operation',
		width: 150,
		ellipsis: true,
		fixed: 'right'
	}
]

onMounted(() => {
	getTreeMt()
})

// 格式化日期
const formatDate = computed(() => {
	return (date: string) => {
		return date ? moment(date).format('YYYY-MM-DD') : ''
	}
})
// 请求部门树
const getTreeMt = async (params = {}) => {
	try {
		const res = await userApi.getTree(params)
		treeData.value = res.data || []
	} catch (error) {
		treeData.value = []
	}
}
// 部门选择
const handleSelectTree = (selectedKeys: string[]) => {
	queryParams.organizationId = selectedKeys[0]
	query({ pageNo: 1, username: '', organizationId: queryParams.organizationId })
}
// 显示model框
const showDictModel = (data?: any) => {
	dictFormRef['value']?.show(data)
}
const handleDetail = (data: any) => {
	showDictModel(JSON.parse(JSON.stringify(data)))
}
</script>

<style lang="less" scoped>
.user-manage {
	width: 100%;
	height: 100%;
	background: #fff;
	border-radius: 4px;

	.userBox {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;

		.treeBox {
			width: 270px;
			border-right: 1px solid #e6e6e6;
			box-shadow: 0px 0px 9px 0px #efefef;
		}

		.tableBox {
			flex: 1;
			width: 0;
			padding: 10px;
			background: #fdfdfd;
		}
	}
}
</style>
