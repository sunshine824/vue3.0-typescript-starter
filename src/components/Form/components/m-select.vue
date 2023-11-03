<template>
  <el-select v-bind="attrs.props?.group"
             ref="elSelectRef"
             :style="attrs.styles">
    <el-option v-for="item in attrs.options"
               v-bind="attrs.props?.child"
               :key="item[attrs.replaceField?.value || 'value']"
               :label="item[attrs.replaceField?.label || 'label']"
               :value="item[attrs.replaceField?.value || 'value']"
               :disabled="item.disabled"></el-option>
  </el-select>
</template>

<script setup lang="ts">
import { useAttrs, ref } from 'vue'
import { FormListItem } from '../form'

const attrs = useAttrs() as FormListItem
const elSelectRef = ref(null)

defineExpose({ elSelectRef })
</script>

<style scoped></style>
