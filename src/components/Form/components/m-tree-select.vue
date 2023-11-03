<template>
  <el-tree-select ref="elTreeSelectRef"
                  v-bind="attrs.props"
                  :data="attrs.treeData"
                  :style="attrs.styles"></el-tree-select>
</template>

<script setup lang="ts">
import { useAttrs, ref } from 'vue'
import { FormListItem } from '../form'

const attrs = useAttrs() as FormListItem
const elTreeSelectRef = ref(null)

defineExpose({ elTreeSelectRef })
</script>

<style scoped></style>
