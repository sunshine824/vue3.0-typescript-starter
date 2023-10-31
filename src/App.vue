<template>
  <el-config-provider :locale="currentLang">
    <RouterView v-if="isRouterAlive"></RouterView>
  </el-config-provider>
</template>

<script setup>
import { computed, ref, provide, onMounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterView } from 'vue-router'
import zhCN from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import ja from 'element-plus/dist/locale/ja.mjs'
import ko from 'element-plus/dist/locale/ko.mjs'
import de from 'element-plus/dist/locale/de.mjs'
import fr from 'element-plus/dist/locale/fr.mjs'
import ru from 'element-plus/dist/locale/ru.mjs'
import th from 'element-plus/dist/locale/th.mjs'
import es from 'element-plus/dist/locale/es.mjs'
import pt from 'element-plus/dist/locale/pt.mjs'

const langs = { 'zh-cn': zhCN, en, ja, ko, de, fr, 'ru-RU': ru, th, es, pt }
const localLang = localStorage.getItem('languageKey') || 'zh-cn'

const { locale } = useI18n()
const isRouterAlive = ref(true)
const currentLang = ref(langs[localLang])

// 切换语言
const changeLang = (key) => {
  locale['value'] = key
  currentLang['value'] = langs[key]
  localStorage.setItem('languageKey', key)
}
provide('changeLang', changeLang)

const reload = () => {
  isRouterAlive['value'] = false
  nextTick(() => {
    isRouterAlive['value'] = true
  })
}
provide('reload', reload)

const debounce = (fn, delay) => {
  let timer = null
  return function () {
    let context = this
    let args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

// 解决ResizeObserver loop limit exceeded报错
const _ResizeObserver = window.ResizeObserver
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor(callback) {
    callback = debounce(callback, 16)
    super(callback)
  }
}
</script>
<style lang="less"></style>
