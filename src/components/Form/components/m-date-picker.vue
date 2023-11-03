<template>
  <el-date-picker v-bind="attrs.props"
                  ref="elDatePickerRef"
                  :style="attrs.styles"></el-date-picker>
</template>

<script setup lang="ts">
import { useAttrs, ref } from 'vue'
import { FormListItem } from '../form'

const attrs = useAttrs() as FormListItem
const elDatePickerRef = ref(null)

defineExpose({ elDatePickerRef })
</script>

<style scoped></style>
