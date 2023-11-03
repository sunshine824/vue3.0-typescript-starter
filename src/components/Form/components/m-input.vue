<template>
  <el-input v-bind="attrs.props"
            ref="elInputRef"
            :style="attrs.styles">
    <template v-for="item in attrs.slots"
              #[item.name]
              :key="item.name">
      <component :is="item.content"></component>
    </template>
  </el-input>
</template>

<script setup lang="ts">
import { useAttrs, ref } from 'vue'
import { FormListItem } from '../form'

const attrs = useAttrs() as FormListItem
const elInputRef = ref(null)

defineExpose({ elInputRef })
</script>

<style lang="less" scoped></style>
