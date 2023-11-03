<template>
  <el-checkbox-group v-bind="attrs.props?.group"
                     ref="elCheckboxButtonRef"
                     :style="attrs.styles">
    <el-checkbox-button v-for="item in attrs.options"
                        v-bind="attrs.props?.child"
                        :key="item[attrs.replaceField?.value || 'value']"
                        :label="item[attrs.replaceField?.value || 'value']"
                        :disabled="item.disabled">
      {{ item[attrs.replaceField?.label || 'label'] }}
    </el-checkbox-button>
  </el-checkbox-group>
</template>

<script setup lang="ts">
import { useAttrs, ref } from 'vue'
import { FormListItem } from '../form'

const attrs = useAttrs() as FormListItem
const elCheckboxButtonRef = ref(null)

defineExpose({
  elCheckboxButtonRef
})
</script>

<style scoped></style>
