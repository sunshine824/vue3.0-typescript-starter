import { RouteRecordRaw } from 'vue-router'
import { RouteLayout } from '@/layouts'

const Routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    component: RouteLayout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home'),
        meta: { title: '首页', hidden: true }
      }
    ]
  }
]

export { Routes }
