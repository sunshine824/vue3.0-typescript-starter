<template>
	<a-modal width="500px" v-model:visible="visible" :title="formState?.guid ? '编辑用户' : '新增用户'">
		<a-form ref="formRef" class="form-box" :model="formState" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }"
			autocomplete="off">
			<a-form-item label="用户名" name="name" :rules="[{ required: true, message: '请输入用户名' }]">
				<a-input v-model:value="formState.name" />
			</a-form-item>
			<a-form-item label="手机号" name="phone" :rules="[{ required: true, message: '请输入手机号' }]">
				<a-input v-model:value="formState.phone" />
			</a-form-item>
			<a-form-item label="用户密码" name="userPassword" :rules="[{ required: true, message: '请输入用户密码' }]">
				<a-input-password v-model:value="formState.userPassword" />
			</a-form-item>
			<a-form-item ref="role" label="所属角色" name="role" :rules="[{ required: true, message: '请选择所属角色' }]">
				<a-select ref="select" v-model:value="formState.role">
					<a-select-option v-for="item in roleLists" :key="item.guid" :value="item.guid">{{ item.name
}}</a-select-option>
				</a-select>
			</a-form-item>
			<a-form-item ref="parentGuid" label="所属部门" name="orgGuid" :rules="[{ required: true, message: '请选择所属部门' }]">
				<a-tree-select :fieldNames="replaceFields" v-model:value="formState.orgGuid" style="width: 100%"
					:tree-data="treeData" allow-clear placeholder="请选择所属部门" />
			</a-form-item>
			<a-form-item label="邮箱" name="email">
				<a-input v-model:value="formState.email" />
			</a-form-item>
			<a-form-item label="性别" name="sex">
				<a-select ref="select" v-model:value="formState.sex">
					<a-select-option value="M">男</a-select-option>
					<a-select-option value="W">女</a-select-option>
				</a-select>
			</a-form-item>
		</a-form>
		<template #footer>
			<a-button @click="hide">取消</a-button>
			<a-button type="primary" @click="onSubmit">确认</a-button>
		</template>
	</a-modal>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import userApi from '@/api/user'
import authApi from '@/api/auth'
import to from 'await-to-js'

const visible = ref(false)
const formRef = ref()
const loading = ref(false)
const emit = defineEmits(['getList'])

let props = defineProps({
	treeData: {
		type: Array,
		default: () => {
			return []
		}
	} // 部门列表
})

const formState = ref<{ [key: string]: any }>({
	guid: null,
	name: '',
	phone: null,
	userCode: null,
	userPassword: null,
	orgGuid: null,
	role: null,
	address: null,
	degreeType: null,
	diseaseFactorCode: null,
	educationType: null,
	email: null,
	entryTime: null,
	graduationTime: null,
	groupGuid: null,
	idCard: null,
	isCrime: null,
	isHealth: null,
	isKeyPosition: null,
	originalPositionAge: null,
	originalPositionCode: null,
	personType: null,
	photoPath: null,
	politicsType: null,
	positionAge: null,
	positionCode: null,
	professionalTitleCode: null,
	schoolGuid: null,
	schoolPositionCode: null,
	sex: null,
	age: null
})

const replaceFields = {
	value: 'key',
	label: 'title'
} // tree字段映射关系
const roleLists = ref([]) // 角色列表

// 显示model框
const show = data => {
	getRoleLists()
	visible['value'] = true
	Object.keys(formState['value']).forEach(key => {
		formState['value'][key] = data[key] || null
	})
}
// 因此model框
const hide = () => {
	visible['value'] = false
	resetForm()
}

// 重置
const resetForm = () => {
	formRef.value.resetFields()
}

// 获取角色列表
const getRoleLists = async () => {
	const [err, res] = await to(authApi.getRolePage({ pageNo: 1, pageSize: 1000 }))
	if (res) {
		roleLists['value'] = res['data']['records'] || []
	} else {
		roleLists['value'] = []
	}
}

// 验证成功回调
const onSubmit = async () => {
	try {
		await formRef.value.validate()
		loading['value'] = true
		const api = formState['value'].guid ? 'editUser' : 'addUser'
		const [err, res] = await to(userApi[api](formState))
		if (res) {
			hide()
			emit('getList')
		}
		resetForm()
		loading['value'] = false
	} catch (error) {
		console.log(error)
	}
}


defineExpose({
	show,
	hide
})
</script>

<style lang="less" scoped>
.form-box {
	.fromBox {
		max-height: 640px;
		padding-right: 10px;
		margin-bottom: 10px;
		overflow: auto;
	}

	.btn-group {
		width: 100%;
		text-align: center;
		margin-top: 20px;
		margin-bottom: 10px;
	}
}
</style>
