import { RouteRecordRaw } from 'vue-router'
import { RouteLayout } from '@/layouts'

const Routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dynamicForm',
    component: RouteLayout,
    children: [
      {
        path: '/dynamicForm',
        name: 'dynamicForm',
        component: () => import('@/views/dynamicForm'),
        meta: { title: '动态表单', hidden: true }
      }
    ]
  }
]

export { Routes }
