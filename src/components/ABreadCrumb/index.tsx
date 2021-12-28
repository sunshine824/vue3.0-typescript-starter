import { defineComponent, watch, Ref, ref, onMounted } from 'vue'
import { useRoute, useRouter, RouteRecordRaw } from 'vue-router'
import { Breadcrumb } from 'ant-design-vue'

import styles from './index.module.less'

const ABreadCrumb = defineComponent({
  name: 'ABreadCrumb',
  setup(props) {
    const route = useRoute()
    const router = useRouter()

    const breadList: Ref<string[]> = ref([])

    onMounted(() => {
      getRouteBreadList()
    })

    // 监听路由变化
    watch(route, (val) => {
      breadList['value'] = []
      getRouteBreadList()
    })

    // 获取路由地址列表
    const getRouteBreadList = () => {
      const paths = route.path.split('/')
      if (paths.length > 1) {
        const menus = getMenus().filter(
          (item: RouteRecordRaw) => item.name == paths[1],
        )
        if (menus.length) {
          getRouteDict(menus, paths)
        }
      }
    }

    // 根据路由获取面包屑列表
    const getRouteDict = (menus: any, paths: string[]) => {
      menus.forEach((item: any) => {
        if (paths.includes(item.name)) {
          breadList['value'].push(item?.meta?.title)
        }
        if (item.children && item.children.length) {
          getRouteDict(item.children, paths)
        }
      })
    }

    // 获取路由列表
    const getMenus = () => {
      let menuList: RouteRecordRaw[] = []
      const routes: Array<RouteRecordRaw> = router.options?.routes || []
      routes.forEach((item) => {
        if (item.path == '/') {
          menuList = item.children || []
        }
      })
      return JSON.parse(JSON.stringify(menuList))
    }

    return () => (
      <div class={styles['bread-crumb']}>
        <span class={styles['location']}>当前位置：</span>
        <Breadcrumb>
          {breadList['value'].map((item) => {
            return <Breadcrumb.Item>{item}</Breadcrumb.Item>
          })}
        </Breadcrumb>
      </div>
    )
  },
})

export default ABreadCrumb
