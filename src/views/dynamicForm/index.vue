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
import { ref } from 'vue'
import { useForm } from './form'

const model = ref<{ [key: string]: any }>({})
const builderFormRef = ref<{ [key: string]: any } | null>(null)

const changeSelect = (val: string) => {
  console.log(val)
}
const httpRequest = (data: any) => {
  library['value']['configs'].some((item) => {
    if (item.formItem.prop == 'fileName') {
      model.value.fileName = data.file.name
      return true
    }
  })
}

const submitForm = async () => {
  const [err, res] = await to(builderFormRef.value?.validate())
  if (res) {
    console.log(res, model['value'])
  }
}

const resetFields = () => {
  builderFormRef.value?.resetFields()
}

const { config: library } = useForm(model, { changeSelect, httpRequest })
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
