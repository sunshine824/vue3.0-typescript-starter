<template>
  <el-input-number v-bind="attrs.props"
                   ref="elInputNumberRef"
                   :style="attrs.styles"></el-input-number>
</template>

<script setup lang="ts">
import { useAttrs, ref } from 'vue'
import { FormListItem } from '../form'

const attrs = useAttrs() as FormListItem
const elInputNumberRef = ref(null)

defineExpose({ elInputNumberRef })
</script>

<style lang="less" scoped></style>
