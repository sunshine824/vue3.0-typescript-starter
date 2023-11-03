<template>
  <el-radio-group v-bind="attrs.props?.group"
                  ref="elRadioButtonRef"
                  :style="attrs.styles">
    <el-radio-button v-for="item in attrs.options"
                     v-bind="attrs.props?.child"
                     :key="item[attrs.replaceField?.value || 'value']"
                     :label="item[attrs.replaceField?.value || 'value']"
                     :disabled="item.disabled">
      {{ item[attrs.replaceField?.label || 'label'] }}
    </el-radio-button>
  </el-radio-group>
</template>

<script setup lang="ts">
import { useAttrs, ref } from 'vue'
import { FormListItem } from '../form'

const attrs = useAttrs() as FormListItem
const elRadioButtonRef = ref(null)

defineExpose({
  elRadioButtonRef
})
</script>

<style scoped></style>
