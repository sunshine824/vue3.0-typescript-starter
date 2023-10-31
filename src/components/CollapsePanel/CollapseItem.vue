<template>
  <div class="collapse-item">
    <div class="collapse-head">
      <el-icon class="caret-down"
               :class="{ 'caret-open': isCollapse }"
               @click.stop="handlePanelItemClick">
        <CaretRight />
      </el-icon>
      <div class="collapse-head-right">
        <span v-if="!slots.title"
              class="collapse-title">{{ attrs.title }}</span>
        <slot name="title"></slot>
      </div>
    </div>
    <CollapseTransition>
      <div v-show="isCollapse"
           class="collapse-content">
        <slot name="content"></slot>
      </div>
    </CollapseTransition>
  </div>
</template>

<script setup lang="ts">
import { ref, useSlots, useAttrs, inject, onMounted, nextTick, computed } from 'vue'
import CollapseTransition from './CollapseTransition.vue'
const slots = useSlots()
const attrs = useAttrs()
const activeNames = inject('activeNames')
const handleToggle = inject('toggle')

const status = ref(false) // 开展状态

const isCollapse = computed(() => {
  return activeNames['value'].includes(attrs.name)
})

const handlePanelItemClick = () => {
  handleToggle(attrs.name)
}
</script>

<style scoped lang="less">
.collapse-item {
  display: flex;
  flex-flow: column;
  .collapse-head {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    height: 42px;
    background: #d9d9d9;
    padding: 0 14px;
    border: 1px solid #cccccc;
    border-bottom: none;
    border-radius: 4px 4px 0px 0px;
    overflow: hidden;
    .caret-down {
      font-size: 20px;
      color: #1b1b1b;
      margin-right: 6px;
      cursor: pointer;
      transition: transform 0.3s;
      transform-origin: center center;
      &.caret-open {
        transform: rotate(90deg);
      }
    }
    .collapse-head-right {
      flex: 1;
      width: 0;
      .collapse-title {
        font-size: 14px;
        color: #1b1b1b;
      }
    }
  }
  .collapse-content {
  }
}
</style>
