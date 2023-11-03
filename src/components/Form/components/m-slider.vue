<template>
  <el-slider v-bind="attrs.props"
             ref="elSliderRef"
             :style="attrs.styles"></el-slider>
</template>

<script setup lang="ts">
import { useAttrs, ref } from 'vue'
import { FormListItem } from '../form'

const attrs = useAttrs() as FormListItem
const elSliderRef = ref(null)

defineExpose({ elSliderRef })
</script>

<style scoped></style>
