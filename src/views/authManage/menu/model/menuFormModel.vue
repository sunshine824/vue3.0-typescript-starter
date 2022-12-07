<template>
	<a-modal v-model:visible="visible" :title="formState.guid ? '编辑菜单' : '新增菜单'">
		<a-form ref="formRef" name="roleForm" :model="formState" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
			<a-form-item ref="name" label="菜单名称" name="name">
				<a-input placeholder="请输入菜单名称" v-model:value="formState.name" />
			</a-form-item>
			<a-form-item ref="parentGuid" label="上级菜单" name="parentGuid">
				<a-tree-select :fieldNames="replaceFields" v-model:value="formState.parentGuid" style="width: 100%" :tree-data="treeData" allow-clear placeholder="请选择上级菜单" />
			</a-form-item>
			<a-form-item ref="functionType" label="菜单类型" name="functionType">
				<a-select ref="select" placeholder="请选择菜单类型" v-model:value="formState.functionType">
					<a-select-option value="catalog">目录</a-select-option>
					<a-select-option value="menu">菜单</a-select-option>
				</a-select>
			</a-form-item>
			<a-form-item ref="orderNum" label="排序号" name="orderNum">
				<a-input placeholder="请输入排序号" v-model:value="formState.orderNum" />
			</a-form-item>
			<a-form-item ref="url" label="菜单URL" name="url">
				<a-input placeholder="请输入菜单URL" v-model:value="formState.url" />
			</a-form-item>
		</a-form>
		<template #footer>
			<a-button @click="hide">取消</a-button>
			<a-button type="primary" @click="onSubmit">确认</a-button>
		</template>
	</a-modal>
</template>

<script setup lang="ts">
import { IAddSysMenu } from '@/api/types/menu'
import { ref, reactive } from 'vue'
import to from 'await-to-js'
import MenuApi from '@/api/menu'

const emits = defineEmits(['updateMenu'])
const props = defineProps({
	treeData: {
		type: Array,
		default: () => {
			return []
		}
	} // 组织机构列表
})

const visible = ref(false)
const formRef = ref()
const loading = ref(false) // 提交状态
const replaceFields = {
	value: 'guid',
	label: 'name'
} // tree字段映射关系
const labelCol = { span: 4 }
const wrapperCol = { span: 19 }
const formState = reactive<IAddSysMenu>({
	guid: '',
	parentGuid: '', //父级部门
	name: '', //部门名称
	functionType: '',
	orderNum: ''
})
const rules = {
	name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
	functionType: [{ required: true, message: '请选择菜单类型', trigger: 'blur' }]
}

// 验证成功回调
const onSubmit = async () => {
	try {
		await formRef.value.validate()
		loading['value'] = true
		const api = formState.guid ? 'updateSysMenu' : 'addSysMenu'
		const [err, res] = await to(MenuApi[api](formState))
		if (res) {
			hide()
			emits('updateMenu')
		}
		resetForm()
		loading['value'] = false
	} catch (error) {
		console.log(error)
	}
}
const resetForm = () => {
	formRef.value.resetFields()
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
	resetForm()
	visible['value'] = false
}

defineExpose({
	show,
	hide
})
</script>

<style lang="less" scoped></style>
