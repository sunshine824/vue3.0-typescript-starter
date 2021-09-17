import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
  RouteLocationNormalized,
  NavigationGuardNext,
  Router,
} from 'vue-router'
import { mainRoutes, baseRoutes } from './router.config'
import { getToken } from '@/utils/token'
import { getPermissionsList } from '@/api/user'
import { RouteLayout } from '@/layouts'

let isAddDynamicMenuRoutes = false // 是否请求路由表

// 路由实例
const router: Router = createRouter({
  history: createWebHistory(),
  routes: baseRoutes,
})

// 构造路由表
function fnAddDynamicMenuRoutes(
  menuList: StoreState.Role[],
  routes: RouteRecordRaw[],
) {
  menuList.forEach((item) => {
    if (!item.list) {
      routes.push({
        path: `${item.url}`,
        name: item.url.slice(0, 1) == '/' ? item.url.slice(1) : item.url, // 截取开头"/"
        component: () => import('../views' + item.moduleUrl + '/index'),
        meta: {
          title: item.name,
          hidden: false,
          icon: item.icon,
        },
      })
    } else if (item.list && item.list.length) {
      const menus = fnAddDynamicMenuRoutes(item.list, [])
      routes.push({
        path: `${item.url}`,
        name: item.url.slice(0, 1) == '/' ? item.url.slice(1) : item.url, // 截取开头"/"
        component: RouteLayout,
        redirect: item.url + '/' + menus[0].path,
        children: menus,
        meta: {
          title: item.name,
          hidden: false,
          icon: item.icon,
        },
      })
    }
  })
  return routes
}

router.beforeEach(
  async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ) => {
    const token: string = getToken() as string
    if (token) {
      // 第一次加载路由列表并且该项目需要动态路由
      if (!isAddDynamicMenuRoutes) {
        try {
          //获取动态路由表
          const res = await getPermissionsList({})
          if (res.code == 200) {
            isAddDynamicMenuRoutes = true
            const menu = res.data
            // 通过路由表构造路由
            const menuRoutes: any = fnAddDynamicMenuRoutes(
              menu.menuList || [],
              [],
            )
            // 添加兜底路由
            menuRoutes.push({
              path: '/:pathMatch(.*)*',
              redirect: { name: '404' },
            })
            mainRoutes.children?.unshift(...menuRoutes)
            // 动态添加路由
            router.addRoute(mainRoutes)
            // 注：这步很关键，不然导航获取不到路由
            router.options.routes.unshift(mainRoutes)
            console.log(router.options)
            // 本地存储按钮权限集合
            sessionStorage.setItem(
              'permissions',
              JSON.stringify(menu.permissions || '[]'),
            )
            if (to.path == '/' || to.path == '/login') {
              const firstName = menuRoutes.length && menuRoutes[0].name
              next({ name: firstName, replace: true })
            } else {
              next({ path: to.fullPath })
            }
          } else {
            sessionStorage.setItem('menuList', '[]')
            sessionStorage.setItem('permissions', '[]')
            next()
          }
        } catch (error) {
          console.log(
            `%c${error} 请求菜单列表和权限失败，跳转至登录页！！`,
            'color:orange',
          )
        }
      } else {
        if (to.path == '/' || to.path == '/login') {
          next(from)
        } else {
          next()
        }
      }
    } else {
      isAddDynamicMenuRoutes = false
      if (to.name != 'login') {
        next({ name: 'login' })
      }
      next()
    }
  },
)

router.onError((handler) => {
  console.log(handler)
})

export default router
