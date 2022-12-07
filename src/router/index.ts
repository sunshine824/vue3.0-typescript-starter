import { createRouter, createWebHistory, Router } from 'vue-router'
import { baseRoutes, mainRoutes, Routes } from './router.config'
import { RouteLayout, BlankLayout } from '@/layouts'

mainRoutes.children = [
	{
		path: '/userManage',
		name: 'userManage',
		component: () => import('@/views/userManage/index.vue'),
		meta: {
			auth: true, // 是否需要登录权限
			title: '用户管理',
			hidden: false,
			icon: 'icon-yonghuguanli'
		}
	},
	{
		path: '/authManage',
		name: 'authManage',
		component: RouteLayout,
		redirect: '/authManage/menu',
		meta: { title: '权限管理', hidden: false, icon: 'icon-shuju' },
		children: [
			{
				path: '/authManage/menu',
				name: 'authManage/menu',
				component: () => import('@/views/authManage/menu/index.vue'),
				meta: { title: '菜单管理', hidden: false, icon: 'icon-shuju', auth: true }
			},
			{
				path: '/authManage/role',
				name: 'authManage/role',
				component: () => import('@/views/authManage/role/index.vue'),
				meta: { title: '角色管理', hidden: false, icon: 'icon-shuju', auth: true }
			}
		]
	},
	{
		path: '/dataProtal',
		name: 'dataProtal',
		component: () => import('@/views/dataProtal'),
		meta: {
			title: '数据门户',
			hidden: false,
			icon: 'icon-index-copy'
		}
	},
	{
		path: '/dataManage',
		name: 'dataManage',
		component: () => import('@/views/dataManage'),
		meta: {
			title: '数据管理',
			hidden: false,
			icon: 'icon-shuju'
		}
	},
	{
		path: '/designCenter',
		name: 'designCenter',
		component: RouteLayout,
		redirect: '/designCenter/screenManage',
		meta: { title: '设计中心', hidden: false, icon: 'icon-shejishi2' },
		children: [
			{
				path: '/designCenter/screenManage',
				name: 'designCenter/screenManage',
				component: () => import('@/views/designCenter/screenManage'),
				meta: { title: '画面管理', hidden: false, icon: 'icon-shituzhushitu' }
			},
			{
				path: '/designCenter/materialMange',
				name: 'designCenter/materialMange',
				component: BlankLayout,
				meta: { title: '素材中心', hidden: false, icon: 'icon-sucai' },
				children: [
					{
						path: '/designCenter/materialMange/customControl',
						name: 'designCenter/materialMange/customControl',
						component: () => import('@/views/designCenter/materialMange/customControl'),
						meta: { title: '自定义控件', hidden: false, icon: 'icon-sucai' }
					},
					{
						path: '/designCenter/materialMange/customMaterial',
						name: 'designCenter/materialMange/customMaterial',
						component: () => import('@/views/designCenter/materialMange/customMaterial'),
						meta: { title: '自定义素材', hidden: false, icon: 'icon-jichukongjiantubiao-gonggongxuanzekuang' }
					}
				]
			}
		]
	},
	...Routes
]

// 路由实例
const router: Router = createRouter({
	history: createWebHistory(),
	routes: [...baseRoutes, mainRoutes]
})

router.beforeEach((to, from, next) => {
	const commonStore = localStorage.getItem('common') as string
	const userInfo = JSON.parse(commonStore)?.userInfo
	if (to.meta.auth) {
		// 判断路由是否需要登录权限
		if (userInfo) {
			if (to.path == '/login') {
				next('/userManage')
			} else {
				next()
			}
		} else {
			next('/login')
		}
	} else {
		next()
	}
})

export default router
