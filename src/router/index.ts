import { createRouter, createWebHistory, Router } from 'vue-router'
import { Routes } from './router.config'

import '../public-path'

// 是否为微服务环境
const __qiankun__ = (window as any).__POWERED_BY_QIANKUN__

// 路由实例
const router: Router = createRouter({
  history: createWebHistory(__qiankun__ ? '/client' : '/'),
  routes: Routes
})

router.beforeEach((to, from, next) => {
  // 当前发布版本号
  const currrentVersion = process.env.VUE_APP_VERSION
  // 当前本地缓存版本号
  const localVersion = localStorage.getItem('catVersion')
  if (currrentVersion !== localVersion) {
    console.log('发布版本与缓存版本不一致')
  }
  next()
})

export default router
