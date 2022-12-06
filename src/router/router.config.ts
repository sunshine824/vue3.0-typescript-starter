import { RouteRecordRaw } from 'vue-router'
import { SimplifyBasicLayout, RouteLayout, LevelBasicLayout } from '@/layouts'

// 导航路由
const Routes: Array<RouteRecordRaw> = [
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
	{
		path: '/:pathMatch(.*)',
		name: 'error',
		component: () => import(/* webpackChunkName: "404" */ '@/views/exception/404'),
		meta: { title: '404', hidden: true }
	}
]

// 主路由
const mainRoutes: RouteRecordRaw = {
	path: '/',
	redirect: '/login',
	component: SimplifyBasicLayout,
	children: []
}

// 基础路由
const baseRoutes: Array<RouteRecordRaw> = [
	{
		path: '/login',
		name: 'login',
		component: () => import(/* webpackChunkName: "login" */ '@/views/user/login')
	}
]

export { mainRoutes, baseRoutes, Routes }
