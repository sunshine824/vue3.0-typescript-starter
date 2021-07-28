import { RouteRecordRaw } from 'vue-router'
import { LevelBasicLayout } from '@/layouts';

// 导航路由
const Routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/home')
  }
]

// 主路由
const mainRoutes: RouteRecordRaw = {
  path: '/',
  redirect: '/login',
  component: LevelBasicLayout,
  children: [
    ...Routes,
    {
      path: '/403',
      name: '403',
      component: () => import(/* webpackChunkName: "403" */ '@/views/exception/403'),
      meta: { title: '403', permission: ['exception'], hidden: true }
    },
    {
      path: '/404',
      name: '404',
      component: () => import(/* webpackChunkName: "404" */ '@/views/exception/404'),
      meta: { title: '404', permission: ['exception'], hidden: true }
    },
    {
      path: '/500',
      name: '500',
      component: () => import(/* webpackChunkName: "500" */ '@/views/exception/500'),
      meta: { title: '500', permission: ['exception'], hidden: true }
    },
  ]
}

// 基础路由
const baseRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/user/login')
  },
]

export { mainRoutes, baseRoutes }
