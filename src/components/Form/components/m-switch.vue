<template>
  <el-switch v-bind="attrs.props"
             ref="elSwitchRef"
             :style="attrs.styles"></el-switch>
</template>

<script setup lang="ts">
import { useAttrs, ref } from 'vue'
import { FormListItem } from '../form'

const attrs = useAttrs() as FormListItem
const elSwitchRef = ref(null)

defineExpose({ elSwitchRef })
</script>

<style scoped></style>
