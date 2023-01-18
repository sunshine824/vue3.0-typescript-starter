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
			title: 'menu.userManage', // i18n
			hidden: false,
			icon: 'icon-yonghuguanli'
		}
	},
	{
		path: '/authManage',
		name: 'authManage',
		component: RouteLayout,
		redirect: '/authManage/menu',
		meta: { title: 'menu.authManage', hidden: false, icon: 'icon-shuju' },
		children: [
			{
				path: '/authManage/menu',
				name: 'authManage/menu',
				component: () => import('@/views/authManage/menu/index.vue'),
				meta: { title: 'menu.menuManage', hidden: false, icon: 'icon-shuju', auth: true }
			},
			{
				path: '/authManage/role',
				name: 'authManage/role',
				component: () => import('@/views/authManage/role/index.vue'),
				meta: { title: 'menu.roleManage', hidden: false, icon: 'icon-shuju', auth: true }
			}
		]
	},
	{
		path: '/dataProtal',
		name: 'dataProtal',
		component: () => import('@/views/dataProtal'),
		meta: {
			title: 'menu.dataProtal',
			hidden: false,
			icon: 'icon-index-copy'
		}
	},
	{
		path: '/dataManage',
		name: 'dataManage',
		component: () => import('@/views/dataManage'),
		meta: {
			title: 'menu.dataManage',
			hidden: false,
			icon: 'icon-shuju'
		}
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
