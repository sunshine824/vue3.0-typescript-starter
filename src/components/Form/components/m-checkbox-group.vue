<template>
  <el-checkbox-group v-bind="attrs.props?.group"
                     ref="elCheckboxGroupRef"
                     :style="attrs.styles">
    <el-checkbox v-for="item in attrs.options"
                 v-bind="attrs.props?.child"
                 :key="item[attrs.replaceField?.value || 'value']"
                 :label="item[attrs.replaceField?.value || 'value']"
                 :disabled="item.disabled">
      {{ item[attrs.replaceField?.label || 'label'] }}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script setup lang="ts">
import { useAttrs, ref } from 'vue'
import { FormListItem } from '../form'

const attrs = useAttrs() as FormListItem
const elCheckboxGroupRef = ref(null)

defineExpose({
  elCheckboxGroupRef
})
</script>

<style scoped></style>
