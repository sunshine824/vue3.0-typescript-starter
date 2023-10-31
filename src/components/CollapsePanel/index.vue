<template>
  <div class="collapse-panel">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useSlots, ref, onMounted, reactive, provide, useAttrs, watch } from 'vue'

const slots = useSlots()
const props = defineProps({
  modelValue: {
    type: [String, Array, Number],
    default: ''
  },
  accordion: {
    type: Boolean
  }
})
const emits = defineEmits(['update:modelValue'])

const activeNames: any = ref([])

onMounted(() => {
  setValueLists()
})

const setValueLists = () => {
  if (!Array.isArray(props.modelValue)) {
    activeNames['value'] = [props.modelValue]
  } else {
    activeNames['value'] = props.modelValue
  }
}
// 点击每项处理函数
const toggle = (name: string) => {
  if (activeNames['value'].includes(name)) {
    activeNames['value'] = activeNames['value'].filter((item: string) => item != name)
  } else {
    if (props.accordion) {
      activeNames['value'] = [name]
    } else {
      activeNames['value'].push(name)
    }
  }
  emits('update:modelValue', activeNames['value'])
}

// 提供父组件指定方法
provide('toggle', toggle)
provide('activeNames', activeNames)
</script>

<style lang="less" scoped></style>
