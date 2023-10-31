<template>
  <el-tooltip :disabled="state.isShowTip"
              :content="attrs.content"
              v-bind="attrs">
    <span :class="['target-con', attrs.className || attrs['class-name'], `target_${state.uuid}`]"
          :style="{ width: attrs.width + 'px' }"
          @mouseover="handleMouseOver">
      {{ $attrs.content }}
    </span>
  </el-tooltip>
</template>

<script setup lang="ts">
import { textRange, uuid } from '@/utils/util'
import { nextTick, reactive, useAttrs } from 'vue'

const attrs = useAttrs()
const state = reactive({
  isShowTip: false,
  uuid: uuid()
})

const handleMouseOver = () => {
  nextTick(() => {
    const target = document.querySelector(`.target_${state.uuid}`)
    state.isShowTip = !textRange(target)
  })
}
</script>

<style lang="less" scoped>
.target-con {
  // width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
