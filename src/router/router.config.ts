import { RouteRecordRaw } from 'vue-router'
import { LevelBasicLayout, RouteLayout } from '@/layouts';

// 导航路由
const Routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/home'),
    meta: { title: '首页', hidden: true }
  },
  {
    path: '/database',
    name: 'database',
    component: () => import(/* webpackChunkName: "database" */ '@/views/database'),
    meta: { title: '数据库配置', hidden: false, icon: 'icon-zichan' }
  },
  {
    path: '/smart',
    name: 'smart',
    component: () => import(/* webpackChunkName: "smart" */ '@/views/smart'),
    meta: { title: '物联管理', hidden: false, icon: 'icon-wulianwang' }
  },
  {
    path: '/eoms',
    name: 'eoms',
    component: RouteLayout,
    meta: { title: '运维配置', hidden: false, icon: 'icon-yunwei1' },
    children: [
      {
        path: "/eoms/fault",
        name: 'fault',
        component: () => import(/* webpackChunkName: "fault" */ '@/views/eoms/fault'),
        meta: { title: '故障处理方案', hidden: false },

      },
      {
        path: "/eoms/alarm",
        name: 'alarm',
        component: () => import(/* webpackChunkName: "alarm" */ '@/views/eoms/alarm'),
        meta: { title: '告警模板管理', hidden: false }
      }
    ]
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
