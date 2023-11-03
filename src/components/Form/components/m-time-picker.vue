<template>
  <el-time-picker v-bind="attrs.props"
                  ref="elTimePickerRef"
                  :style="attrs.styles"></el-time-picker>
</template>

<script setup lang="ts">
import { useAttrs, ref } from 'vue'
import { FormListItem } from '../form'

const attrs = useAttrs() as FormListItem
const elTimePickerRef = ref(null)

defineExpose({ elTimePickerRef })
</script>

<style scoped></style>
