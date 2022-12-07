<template>
	<a-modal width="820px" v-model:visible="visible" :title="formState?.guid ? '编辑用户' : '新增用户'" :footer="false">
		<a-form
			ref="formRef"
			class="form-box"
			:model="formState"
			name="basic"
			:label-col="{ span: 8 }"
			:wrapper-col="{ span: 16 }"
			autocomplete="off"
			@finish="onFinish"
			@finishFailed="onFinishFailed"
		>
			<div class="fromBox">
				<a-row>
					<a-col :span="12">
						<a-form-item label="用户名" name="name" :rules="[{ required: true, message: '请输入用户名' }]">
							<a-input v-model:value="formState.name" />
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="手机号" name="phone" :rules="[{ required: true, message: '请输入手机号' }]">
							<a-input v-model:value="formState.phone" />
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="用户账号" name="userCode" :rules="[{ required: true, message: '请输入用户账号' }]">
							<a-input v-model:value="formState.userCode" />
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="用户密码" name="userPassword" :rules="[{ required: true, message: '请输入用户密码' }]">
							<a-input-password v-model:value="formState.userPassword" />
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item ref="role" label="所属角色" name="role" :rules="[{ required: true, message: '请选择所属角色' }]">
							<a-select ref="select" v-model:value="formState.role">
								<a-select-option v-for="item in roleLists" :key="item.guid" :value="item.guid">{{ item.name }}</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item ref="parentGuid" label="所属部门" name="orgGuid" :rules="[{ required: true, message: '请选择所属部门' }]">
							<a-tree-select
								:fieldNames="replaceFields"
								v-model:value="formState.orgGuid"
								style="width: 100%"
								:tree-data="treeData"
								allow-clear
								placeholder="请选择所属部门"
							/>
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="身份证" name="idCard" :rules="[{ required: true, message: '请输入身份证' }]">
							<a-input v-model:value="formState.idCard" />
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="地址" name="address">
							<a-input v-model:value="formState.address" />
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="年龄" name="age">
							<a-input v-model:value="formState.age" />
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="邮箱" name="email">
							<a-input v-model:value="formState.email" />
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="学位" name="degreeType">
							<a-select ref="select" v-model:value="formState.degreeType">
								<a-select-option value="jack">Jack</a-select-option>
								<a-select-option value="lucy">Lucy</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="学历" name="educationType">
							<a-select ref="select" v-model:value="formState.educationType">
								<a-select-option value="jack">Jack</a-select-option>
								<a-select-option value="lucy">Lucy</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="人员类型" name="personType">
							<a-select ref="select" v-model:value="formState.personType">
								<a-select-option value="1">是</a-select-option>
								<a-select-option value="0">否</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="专业" name="professionalTitleCode">
							<a-select ref="select" v-model:value="formState.professionalTitleCode">
								<a-select-option value="1">是</a-select-option>
								<a-select-option value="0">否</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="毕业院校" name="schoolGuid">
							<a-select ref="select" v-model:value="formState.schoolGuid">
								<a-select-option value="1">是</a-select-option>
								<a-select-option value="0">否</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="性别" name="sex">
							<a-select ref="select" v-model:value="formState.sex">
								<a-select-option value="M">男</a-select-option>
								<a-select-option value="W">女</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="入职时间" name="entryTime">
							<a-date-picker style="width: 100%" v-model:value="formState.entryTime" />
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="毕业时间" name="graduationTime">
							<a-date-picker style="width: 100%" v-model:value="formState.graduationTime" picker="month" />
						</a-form-item>
					</a-col>
				</a-row>
			</div>
			<div class="btn-group">
				<a-button class="mr10" type="primary" html-type="submit">{{ formState?.guid ? '编辑' : '创建' }}</a-button>
				<a-button @click="resetForm">重置</a-button>
			</div>
		</a-form>
	</a-modal>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import userApi from '@/api/user'
import authApi from '@/api/auth'
import to from 'await-to-js'

const visible = ref(false)
const formRef = ref()
const emit = defineEmits(['getList'])

let props = defineProps({
	treeData: {
		type: Array,
		default: () => {
			return []
		}
	} // 部门列表
})

const formState = ref<{[key:string]:any}>({
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

const onFinish = (values: any) => {
	console.log('Success:', values)
	if (formState['value'].guid) {
		userApi.editUser(formState['value']).then(res => {
			if (res.code == 200) {
				hide()
				emit('getList')
			}
		})
	} else {
		userApi.addUser(formState['value']).then(res => {
			if (res.code == 200) {
				hide()
				emit('getList')
			}
		})
	}
}

const onFinishFailed = (errorInfo: any) => {
	console.log('Failed:', errorInfo)
}
defineExpose({
	show,
	hide,
	onFinish,
	onFinishFailed
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
