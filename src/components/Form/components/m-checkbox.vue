<template>
  <el-checkbox v-bind="attrs"
               ref="elCheckboxRef"
               :style="attrs.styles"></el-checkbox>
</template>

<script setup lang="ts">
import { useAttrs, ref } from 'vue'
import { FormListItem } from '../form'

const attrs = useAttrs() as FormListItem
const elCheckboxRef = ref(null)

defineExpose({
  elCheckboxRef
})
</script>

<style scoped></style>
