<template>
  <el-form v-bind="props.form"
           ref="formRef"
           :model="model">
    <el-row :gutter="20">
      <el-col v-for="item in props.configs"
              :key="item.formItem.prop"
              :span="item.colSpan">
        <el-form-item v-if="ifShow(item, model)"
                      v-bind="item.formItem">
          <template v-if="item.typeName == 'upload'">
            <el-upload v-bind="item.props">
              <template v-for="it in item.slots"
                        #[it.name]
                        :key="it.name">
                <component :is="it.content"></component>
              </template>
            </el-upload>
          </template>

          <template v-if="!item.children?.length">
            <component :is="components[`m-${item.typeName}`]"
                       v-bind="item"
                       v-model="model[item.formItem.prop as string]"
                       :placeholder="item.placeholder"
                       :form-data="model"
                       :disabled="ifDisabled(item, model)"></component>
          </template>

          <template v-else>
            <el-col v-for="(child, index) in item.children"
                    :key="index"
                    :span="child.colSpan">
              <el-form-item v-bind="child.formItem">
                <component :is="components[`m-${child.typeName}`]"
                           v-bind="child"
                           v-model="model[child.formItem.prop as string]"
                           :form-data="model"
                           :disabled="ifDisabled(child, model)"
                           :placeholder="child.placeholder"></component>
              </el-form-item>
            </el-col>
          </template>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import cloneDeep from 'lodash/cloneDeep'
import { ref, onMounted, watch, computed } from 'vue'
import { getType } from '@/utils/util'
import type { ElForm, FormInstance } from 'element-plus'
import { FormListItem, FConfig } from './form'

import mInput from './components/m-input.vue'
import mSelect from './components/m-select.vue'
import mDatePicker from './components/m-date-picker.vue'
import mTimePicker from './components/m-time-picker.vue'
import mSwitch from './components/m-switch.vue'
import mCheckbox from './components/m-checkbox.vue'
import mCheckboxGroup from './components/m-checkbox-group.vue'
import mCheckboxButton from './components/m-checkbox-button.vue'
import mRadioGroup from './components/m-radio-group.vue'
import mRadioButton from './components/m-radio-button.vue'
import mInputNumber from './components/m-input-number.vue'
import mTreeSelect from './components/m-tree-select.vue'
import mSlider from './components/m-slider.vue'

type Props = FConfig & {
  data: { [key: string]: any }
}
const emits = defineEmits(['update:data'])
const props = withDefaults(defineProps<Props>(), {})
const model = ref<{ [key: string]: any }>({})
const formRef = ref<FormInstance | null>()
const components: { [key: string]: any } = {
  'm-input': mInput,
  'm-select': mSelect,
  'm-date-picker': mDatePicker,
  'm-time-picker': mTimePicker,
  'm-switch': mSwitch,
  'm-checkbox': mCheckbox,
  'm-checkbox-group': mCheckboxGroup,
  'm-checkbox-button': mCheckboxButton,
  'm-radio-group': mRadioGroup,
  'm-radio-button': mRadioButton,
  'm-input-number': mInputNumber,
  'm-tree-select': mTreeSelect,
  'm-slider': mSlider
}

// 初始化表单方法
const initForm = () => {
  if (props.configs?.length) {
    let m: { [key: string]: any } = {}
    props.configs.map((item) => {
      if (!item.children?.length) {
        m[item.formItem.prop as string] = item.props?.defaultValue
      } else {
        item.children.map((child) => {
          m[child.formItem.prop as string] = child.props?.defaultValue
        })
      }
    })
    model.value = cloneDeep({ ...props.data, ...m })
  }
}

const ifDisabled = computed(() => {
  return (column: FormListItem, model: { [key: string]: any }) => {
    let disabled = column.props?.disabled
    switch (getType(disabled)) {
      case 'function':
        disabled = (disabled as any)(model)
        break
      case 'undefined':
        disabled = false
    }
    return disabled
  }
})

const ifShow = (column: FormListItem, model: { [key: string]: any }) => {
  let flag = column.isShow
  switch (getType(flag)) {
    case 'function':
      flag = (flag as any)(model)
      break
    case 'undefined':
      flag = true
      break
  }
  return flag
}

// 组件重写表单重置的方法
const resetFields = () => {
  // 重置element-plus 的表单
  formRef.value?.resetFields()
}

// 表单验证
const validate = () => {
  return new Promise((resolve, reject) => {
    formRef.value?.validate((valid) => {
      if (valid) {
        resolve(true)
      } else {
        reject(false)
      }
    })
  })
}

const getFormData = () => {
  return model.value
}

onMounted(() => {
  initForm()
})

watch(
  () => model.value,
  (val) => {
    emits('update:data', val)
  }
)

watch(
  () => props.data,
  (val) => {
    model.value = val
  }
)

watch(
  () => props.configs,
  () => {
    initForm()
  },
  { deep: true }
)

defineExpose({
  resetFields,
  getFormData,
  validate
})
</script>

<style scoped></style>
