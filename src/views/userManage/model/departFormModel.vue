<template>
	<a-modal v-model:visible="visible" :title="formState.guid ? '编辑部门' : '新增部门'">
		<a-form ref="formRef" name="roleForm" :model="formState" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
			<a-form-item ref="name" label="部门名称" name="name">
				<a-input placeholder="请输入部门名称" v-model:value="formState.name" />
			</a-form-item>
			<a-form-item ref="parentGuid" label="上级部门" name="parentGuid">
				<a-tree-select :fieldNames="replaceFields" v-model:value="formState.parentGuid" style="width: 100%" :tree-data="treeData" allow-clear placeholder="请选择上级部门" />
			</a-form-item>
			<a-form-item ref="remark" label="部门备注" name="remark">
				<a-input placeholder="请输入部门备注" v-model:value="formState.remark" />
			</a-form-item>
		</a-form>
		<template #footer>
			<a-button @click="hide">取消</a-button>
			<a-button type="primary" @click="onSubmit">确认</a-button>
		</template>
	</a-modal>
</template>

<script setup lang="ts">
import { IAddDepartParams } from '@/api/types/depart'
import { ref, reactive } from 'vue'
import to from 'await-to-js'
import DepartApi from '@/api/depart'

const emits = defineEmits(['updateDepart'])
const props = defineProps({
	treeData: {
		type: Object,
		default: () => {
			return {}
		}
	} // 组织机构列表
})

const visible = ref(false)
const formRef = ref()
const loading = ref(false) // 提交状态
const labelCol = { span: 4 }
const wrapperCol = { span: 19 }
const replaceFields = {
	value: 'key',
	label: 'title'
} // tree字段映射关系
const formState = reactive<IAddDepartParams>({
	guid: '',
	parentGuid: '', //父级部门
	name: '', //部门名称
	remark: '' //部门备注
})
const rules = {
	name: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
	remark: [{ required: true, message: '请输入部门备注', trigger: 'blur' }]
}

// 验证成功回调
const onSubmit = async () => {
	try {
		await formRef.value.validate()
		loading['value'] = true
		const api = formState.guid ? 'updateSysDepart' : 'addSysDepart'
		const [err, res] = await to(DepartApi[api](formState))
		if (res) {
			hide()
			emits('updateDepart')
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
			if (key != 'parentGuid') {
				formState[key] = record[key]
			}
		})
	}
	formState['parentGuid'] = record['parentGuid']?.length ? record['parentGuid'][0] : null
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
