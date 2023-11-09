<template>
  <div class="dynamic-form">
    <builder-form ref="builderFormRef"
                  v-model:data="model"
                  :configs="library.configs"
                  :form="library"></builder-form>
    <div class="dynamic-btn">
      <el-button @click="resetFields">
        重置
      </el-button>
      <el-button type="primary"
                 @click="submitForm">
        提交
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import to from 'await-to-js'
import { ref, onMounted } from 'vue'
import { useFormIterate } from './form'

const builderFormRef = ref<{ [key: string]: any } | null>(null)

onMounted(() => {
  updateModel()
})

const updateModel = () => {
  // 模拟通过接口返回数据回显
  setTimeout(() => {
    model.value.name = 'xxxx'
  }, 1500)
}

const changeSelect = (val: string) => {
  // 模拟通过接口返回的数据更新select options
  setTimeout(() => {
    changeSelectOptions('region1', [
      { key: 'shanghai', title: 'Zone one1' },
      { key: 'beijing', title: 'Zone two2' }
    ])
  }, 200)
}

// 自定义上传文件，覆盖默认Xhr行为
const httpRequest = (data: any) => {
  library['value']['configs'].some((item) => {
    if (item.formItem.prop == 'fileName') {
      model.value.fileName = data.file.name
      return true
    }
  })
}
// 提交表单
const submitForm = async () => {
  const [err, res] = await to(builderFormRef.value?.validate())
  if (res) {
    console.log(res, model['value'])
  }
}
// 重置表单
const resetFields = () => {
  builderFormRef.value?.resetFields()
}

const { config: library, model, changeSelectOptions } = useFormIterate({ changeSelect, httpRequest })
</script>

<style scoped lang="less">
.dynamic-form {
  padding: 30px;
  box-sizing: border-box;
  .dynamic-btn {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
