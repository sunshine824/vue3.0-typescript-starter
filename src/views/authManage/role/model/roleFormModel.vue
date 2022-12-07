<template>
	<a-modal v-model:visible="visible" :title="formState.guid ? '编辑角色' : '新增角色'">
		<a-form ref="formRef" name="roleForm" :model="formState" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
			<a-form-item ref="name" label="角色名称" name="name">
				<a-input placeholder="请输入角色名称" v-model:value="formState.name" />
			</a-form-item>
			<a-form-item ref="name" label="角色菜单" name="menu">
				<a-tree-select
					:fieldNames="replaceFields"
					v-model:value="formState.menu"
					style="width: 100%"
					:tree-data="treeData"
					tree-checkable
					allow-clear
					placeholder="请选择角色菜单"
				/>
			</a-form-item>
			<a-form-item ref="name" label="角色备注" name="remark">
				<a-input placeholder="请输入角色备注" v-model:value="formState.remark" />
			</a-form-item>
		</a-form>
		<template #footer>
			<a-button @click="hide">取消</a-button>
			<a-button type="primary" @click="onSubmit">确认</a-button>
		</template>
	</a-modal>
</template>

<script setup lang="ts">
import { IAddSysParams } from '@/api/types/auth'
import { ref, reactive } from 'vue'
import to from 'await-to-js'
import AuthApi from '@/api/auth'

const emits = defineEmits(['updateRolePage'])
const props = defineProps({
	treeData: {
		type: Array,
		default: () => {
			return []
		}
	} // 组织机构列表
})

const replaceFields = {
	value: 'guid',
	label: 'name'
} // tree字段映射关系
const visible = ref(false)
const formRef = ref()
const loading = ref(false) // 提交状态
const labelCol = { span: 4 }
const wrapperCol = { span: 19 }
const formState = reactive<IAddSysParams>({
	guid: '',
	menu: [], //绑定菜单
	name: '', //角色名称
	remark: '' //备注
})
const rules = {
	name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
	menu: [{ required: true, message: '请选择角色菜单', trigger: 'change' }],
	remark: [{ required: true, message: '请输入角色备注', trigger: 'blur' }]
}

const menuLists: any = [
	{
		title: 'Node1',
		value: '0-0',
		children: [
			{
				title: 'Child Node1',
				value: '0-0-0'
			}
		]
	},
	{
		title: 'Node2',
		value: '0-1',

		children: [
			{
				title: 'Child Node3',
				value: '0-1-0',
				disabled: true
			},
			{
				title: 'Child Node4',
				value: '0-1-1'
			},
			{
				title: 'Child Node5',
				value: '0-1-2'
			}
		]
	}
] // 菜单tree列表

// 验证成功回调
const onSubmit = async () => {
	try {
		await formRef.value.validate()
		loading['value'] = true
		const api = formState.guid ? 'updateSysRole' : 'addSysRole'
		const [err, res] = await to(
			AuthApi[api]({
				...formState,
				menu: (formState.menu as []).join(',')
			})
		)
		if (res) {
			hide()
			emits('updateRolePage')
		}
		loading['value'] = false
	} catch (error) {
		console.log(error)
	}
}

// 显示model框
const show = record => {
	if (record.guid) {
		Object.keys(formState).forEach(key => {
			formState[key] = record[key]
		})
	}
	visible['value'] = true
}
// 因此model框
const hide = () => {
	visible['value'] = false
}

defineExpose({
	show,
	hide
})
</script>

<style lang="less" scoped></style>
