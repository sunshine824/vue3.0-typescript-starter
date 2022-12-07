<template>
	<AdvancedTable>
		<template #form>
			<a-form class="my-form" layout="inline">
				<a-form-item label="角色名称">
					<a-input v-model:value="queryParams.name" placeholder="请输入角色名称" />
				</a-form-item>
				<a-form-item>
					<a-button class="mr10" type="primary" @click="query({ pageNo: 1 })">查询</a-button>
					<a-button @click="query({ pageNo: 1, name: '' })">重置</a-button>
				</a-form-item>
			</a-form>
		</template>
		<template #btns>
			<a-button class="mr10" type="primary" @click="showRoleModel">
				<template #icon>
					<PlusCircleOutlined />
				</template>
				新增
			</a-button>
		</template>
		<template #table>
			<div class="data-protal">
				<a-table class="my-table" :loading="loading" :row-key="record => record.guid" :row-selection="{
					selectedRowKeys: selectRowKeys,
					onChange: selectChange
				}" @change="tableChange" :pagination="pagination" :columns="columns" :data-source="tableData">
					<template #bodyCell="{ column, record, index }">
						<template v-if="column.key == 'index'">
							<span>{{ index + 1 }}</span>
						</template>
						<template v-if="column.key == 'operation'">
							<a href="#" @click="showRoleModel(record)">编辑</a>
							<a-divider type="vertical" />
							<a href="#" @click="handleDetele({ guidComma: record.guid })">删除</a>
						</template>
					</template>
				</a-table>
			</div>
		</template>
	</AdvancedTable>
	<role-form-model ref="roleFormRef" @updateRolePage="query({ pageNo: 1, name: '' })" />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { TableFuns } from '@/mixins/tableFuns'
import { PlusCircleOutlined } from '@ant-design/icons-vue'
import AdvancedTable from '@/components/AdvancedTable.vue'
import RoleFormModel from './model/roleFormModel.vue'
import AuthApi from '@/api/auth'

const FetchApi = {
	queryApi: AuthApi.getRolePage,
	deleteApi: AuthApi.delSysRole
} // 请求接口
const queryParams = reactive({ pageNo: 1, pageSize: 10, name: '' }) // 请求列表参数
const roleFormRef = ref<null | InstanceType<typeof RoleFormModel>>(null) // 角色modelRef

// 引入table公共逻辑
const { tableData, loading, pagination, selectRowKeys, query, tableChange, selectChange, handleDetele } = TableFuns({ FetchApi, queryParams })

const columns = [
	{
		title: '序号',
		dataIndex: 'index',
		key: 'index',
		align: 'center'
	},
	{
		title: '角色名称',
		align: 'center',
		dataIndex: 'name',
		key: 'name'
	},
	{
		title: '备注',
		align: 'center',
		dataIndex: 'remark',
		key: 'remark'
	},
	{
		title: '创建时间',
		align: 'center',
		dataIndex: 'createTime',
		key: 'createTime',
		width: 180
	},
	{
		title: '操作',
		align: 'center',
		key: 'operation',
		width: 150
	}
]

// 显示model框
const showRoleModel = (record = {}) => {
	roleFormRef['value']?.show(record)
}
</script>

<style lang="less" scoped>
</style>
