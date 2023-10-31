<template>
  <transition @before-enter="beforeEnter"
              @enter="enter"
              @leave="leave"
              @after-leave="afterLeave">
    <slot></slot>
  </transition>
</template>

<script setup lang="ts">
const beforeEnter = (el) => {
  el.classList.add('collapse-transition')
  el.dataset.oldPaddingTop = el.style.paddingTop
  el.dataset.oldPaddingBottom = el.style.paddingBottom
  el.dataset.oldOverflow = el.style.overflow
  el.style.overflow = 'hidden'
  el.style.height = '0'
  el.style.paddingTop = 0
  el.style.paddingBottom = 0
}
const enter = (el) => {
  el.style.height = el.scrollHeight + 'px'
  el.style.paddingTop = el.dataset.oldPaddingTop
  el.style.paddingBottom = el.dataset.oldPaddingBottom
}

const afterEnter = (el) => {
  el.classList.remove('collapse-transition')
  el.style.height = ''
  el.style.overflow = el.dataset.oldOverflow
}

const beforeLeave = (el) => {
  el.dataset.oldPaddingTop = el.style.paddingTop
  el.dataset.oldPaddingBottom = el.style.paddingBottom
  el.dataset.oldOverflow = el.style.overflow
  el.style.height = el.scrollHeight + 'px'
  el.style.overflow = 'hidden'
}

const leave = (el) => {
  el.classList.add('collapse-transition')
  el.style.height = 0
  el.style.paddingTop = 0
  el.style.paddingBottom = 0
}

const afterLeave = (el) => {
  el.classList.remove('collapse-transition')
  el.style.height = ''
  el.style.overflow = el.dataset.oldOverflow
  el.style.paddingTop = el.dataset.oldPaddingTop
  el.style.paddingBottom = el.dataset.oldPaddingBottom
}
</script>

<style scoped lang="less">
.collapse-transition {
  transition: all 0.3s ease-in-out;
}
</style>
