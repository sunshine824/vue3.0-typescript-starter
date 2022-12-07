<template>
	<AdvancedTable>
		<template #form>
			<a-form class="my-form" layout="inline">
				<a-form-item label="菜单类型">
					<a-select ref="select" allowClear style="width: 200px" placeholder="请选择菜单类型" v-model:value="queryParams.functionType">
						<a-select-option value="catalog">目录</a-select-option>
						<a-select-option value="menu">菜单</a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item label="菜单名称">
					<a-input allowClear v-model:value="queryParams.name" placeholder="请输入菜单名称" />
				</a-form-item>
				<a-form-item>
					<a-button class="mr10" type="primary" @click="query({ pageNo: 1 })">查询</a-button>
					<a-button @click="query({ pageNo: 1, functionType: '', name: '', parentGuid: '' })">重置</a-button>
				</a-form-item>
			</a-form>
		</template> 
		<template #btns>
			<a-button @click="handleClickMenu" class="mr10" type="primary">
				<template #icon>
					<PlusCircleOutlined />
				</template>
				新增
			</a-button>
		</template>
		<template #table>
			<div class="data-protal">
				<a-table
					class="my-table"
					:loading="loading"
					:row-key="record => record.guid"
					:row-selection="{
						selectedRowKeys: selectRowKeys,
						onChange: selectChange
					}"
					:scroll="{ x: '100%' }"
					@change="tableChange"
					:pagination="pagination"
					:columns="columns"
					:data-source="tableData"
				>
					<template #bodyCell="{ column, record, index }">
						<template v-if="column.key == 'index'">
							<span>{{ index + 1 }}</span>
						</template>
						<template v-if="column.key == 'operation'">
							<a href="#" @click="handleClickMenu(record)">编辑</a>
							<a-divider type="vertical" />
							<a href="#" @click="handleDetele({ code: record.code })">删除</a>
						</template>
						<template v-if="column.key == 'functionType'">
							<a-tag color="blue" v-if="record.functionType == 'catalog'">目录</a-tag>
							<a-tag v-else color="green">菜单</a-tag>
						</template>
					</template>
				</a-table>
			</div>
		</template>
	</AdvancedTable>
	<!-- 菜单新增、编辑model -->
	<menu-form-model ref="menuFormRef" :treeData="tableData" @updateMenu="query" />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { TableFuns } from '@/mixins/tableFuns'
import { PlusCircleOutlined } from '@ant-design/icons-vue'
import AdvancedTable from '@/components/AdvancedTable.vue'
import MenuFormModel from './model/menuFormModel.vue'
import MenuApi from '@/api/menu'

const FetchApi = {
	queryApi: MenuApi.getMenuPage,
	deleteApi: MenuApi.delSysMenu
} // 请求接口
const menuFormRef = ref<null | InstanceType<typeof MenuFormModel>>(null)
const queryParams = reactive({ pageNo: 1, pageSize: 1000, functionType: null, name: '', parentGuid: '' }) // 请求列表参数

// 引入table公共逻辑
const { tableData, loading, pagination, selectRowKeys, query, tableChange, selectChange, handleDetele } = TableFuns({ FetchApi, queryParams })

const columns = [
	{
		title: '菜单名称',
		align: 'center',
		dataIndex: 'name',
		key: 'name',
		width: 200,
		ellipsis: true,
		fixed: true
	},
	{
		title: '上级菜单',
		align: 'center',
		dataIndex: 'parentName',
		key: 'parentName',
		width: 180,
		ellipsis: true,
		fixed: true
	},
	{
		title: '菜单类型',
		align: 'center',
		dataIndex: 'functionType',
		key: 'functionType',
		width: 200,
		ellipsis: true
	},
	{
		title: '排序号',
		align: 'center',
		dataIndex: 'orderNum',
		key: 'orderNum',
		width: 150,
		ellipsis: true
	},
	{
		title: '菜单URL',
		align: 'center',
		dataIndex: 'url',
		key: 'url',
		width: 180,
		ellipsis: true
	},
	{
		title: '创建时间',
		align: 'center',
		dataIndex: 'createTime',
		key: 'createTime',
		width: 180,
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

// 显示弹出框
const handleClickMenu = (data = {}) => {
	menuFormRef['value']?.show(data)
}
</script>

<style lang="less" scoped></style>
