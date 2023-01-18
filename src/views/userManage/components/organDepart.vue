<template>
	<div class="organ-depart">
		<div class="depart-title">
			<p class="title">组织部门</p>
		</div>
		<div class="oper-btn">
			<p class="btn-item" @click="handleAddDepart">
				<PlusSquareOutlined class="btn-icon" />
				添加
			</p>
			<p class="btn-item del" @click="handleDelete">
				<MinusSquareOutlined class="btn-icon" />
				删除
			</p>
		</div>
		<a-input-search class="search-box" v-model:value="state.searchVal" placeholder="请输入关键词" @search="handleSearch" />
		<div class="depart-tree">
			<a-tree
				v-model:checkedKeys="state.checkedKeys"
				:replaceFields="replaceFields"
				@select="$attrs.onSelectTree"
				v-if="treeData?.length"
				checkable
				:checkStrictly="true"
				:tree-data="treeData"
			>
				<template #title="{ name }">
					<span class="txt">{{ name }}</span>
				</template>
			</a-tree>
			<div class="empty-box" v-else>暂无组织部门 ~</div>
		</div>
		<!-- 组织form -->
		<depart-form-model ref="departFormRef" :treeData="treeData" @updateDepart="$attrs.onGetTreeMt" />
	</div>
</template>

<script setup lang="ts">
import { PlusSquareOutlined, MinusSquareOutlined } from '@ant-design/icons-vue'
import { ref, reactive, onMounted, useAttrs } from 'vue'
import DepartFormModel from '../model/departFormModel.vue'
import userApi from '@/api/user'
import DepartApi from '@/api/depart'
import { to } from 'await-to-js'
import { Message } from '@/utils/resetMessage'
import { Modal } from 'ant-design-vue'

const props = defineProps({
	treeData: {
		type: Object,
		default: () => {
			return {}
		}
	} // 组织机构列表
})

const attrs: any = useAttrs()
const departFormRef = ref(null)
const replaceFields = {
	title: 'name',
	key: 'id'
} // 替换对应字段

const state = reactive({
	searchVal: '',
	checkedKeys: []
})

// 查询部门列表
const handleSearch = async () => {
	attrs.onGetTreeMt({ name: state.searchVal })
}
// 删除部门
const handleDelete = async () => {
	Modal.confirm({
		title: '确定进行[删除]操作?',
		okText: '确定',
		class: 'my-modal',
		cancelText: '取消',
		onOk: async () => {
			onDetele()
		},
		onCancel: () => {
			console.log('Cancel')
		}
	})
}
const onDetele = async () => {
	const [err, res] = await to(
		DepartApi.deleteSysDepart({
			id: state.checkedKeys['checked'].join(',')
		})
	)
	if (res) {
		attrs.onGetTreeMt()
		Message.success('删除成功')
	} else {
		Message.error('删除失败')
	}
}
// 新增部门
const handleAddDepart = () => {
	if (state.checkedKeys?.length > 1) {
		Message.warning('上级部门只能选择一个')
		return
	}
	departFormRef['value'].show({
		parentId: state.checkedKeys['checked']
	})
}
</script>

<style lang="less" scoped>
.organ-depart {
	width: 100%;
	height: 100%;
	display: flex;
	flex-flow: column nowrap;

	.depart-title {
		height: 38px;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #e6e6e6;
		padding: 0 8px;

		.title {
			font-size: 15px;
			color: #1b1b1b;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;

			&::before {
				content: '';
				width: 3px;
				height: 18px;
				background: #005eff;
				margin-right: 5px;
			}
		}
	}

	.search-box {
		padding: 10px;
		padding-bottom: 5px;
	}

	.depart-tree {
		padding: 5px;
		padding-top: 10px;
		flex: 1;

		.depart-item {
			position: relative;
		}

		.empty-box {
			font-size: 13px;
			color: #666;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.oper-btn {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-end;
		margin-bottom: 0px;
		padding-right: 5px;
		padding-top: 10px;

		.btn-item {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			color: #005eff;
			font-size: 14px;
			cursor: pointer;
			margin-right: 8px;

			.btn-icon {
				margin-right: 5px;
			}
		}

		.del {
			margin-left: 4px;
			color: #fb3f58;
		}
	}

	.organ-btn {
		text-align: left;
		padding: 5px 10px;
		padding-left: 2px;
	}
}
</style>
