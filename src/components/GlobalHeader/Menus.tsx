import { defineComponent, ref, watch, computed } from 'vue'
import { useRoute, useRouter, RouteRecordRaw } from 'vue-router'
import { Menu } from 'ant-design-vue'

import styles from './index.module.less'

const Menus = defineComponent({
  name: 'Menus',
  props: {
    mode: {
      type: String,
      default: 'horizontal',
    },
  },
  setup(props, { slots }) {
    const route = useRoute()
    const router = useRouter()
    const activeRoute = ref(route.path) // 当前路由

    // 默认展开项
    const openKeys = computed(() => {
      if (props.mode == 'inline') {
        return ['/smart', '/eoms', '/system', '/database']
      }
      return []
    })

    // 获取显示状态的路由
    const menuLists = computed(() => {
      return getMenus().filter((item) => !item?.meta?.hidden)
    })

    // 获取路由列表
    const getMenus = () => {
      let menuList: RouteRecordRaw[] = []
      const routes: Array<RouteRecordRaw> = useRouter().options?.routes || []
      routes.forEach((item) => {
        if (item.path == '/') {
          menuList = item.children || []
        }
      })
      return menuList
    }

    //  路由跳转
    const handleMenuClick = (item: { key: string }) => {
      router.push(item.key)
    }

    // 监听路由变化
    watch(route, (val) => {
      activeRoute.value = val.path
    })

    // 子级导航渲染
    const SubItem = (menus: any) => {
      return (
        <Menu.SubMenu key={menus.path}>
          {{
            title: () => (
              <>
                {menus.meta?.icon && (
                  <span class={`iconfont ${menus.meta.icon} menu-icon`}></span>
                )}
                <span>{menus.meta?.title}</span>
              </>
            ),
            default: () => (
              <>
                {menus.children.map((menu: any) => {
                  if (!menu.children || !menu.children.length) {
                    return (
                      <Menu.Item key={menu.path}>
                        <span>{menu.meta?.title}</span>
                      </Menu.Item>
                    )
                  } else {
                    return SubItem(menu)
                  }
                })}
              </>
            ),
          }}
        </Menu.SubMenu>
      )
    }

    return () => (
      <div
        class={`${styles['menu-class']} ${styles[props.mode + '-menu-class']}`}
      >
        <Menu
          theme="dark"
          selectedKeys={[activeRoute.value]}
          openKeys={openKeys.value}
          mode={props.mode}
          style={{ lineHeight: '54px' }}
          onClick={handleMenuClick}
        >
          {menuLists['value'].map((menu) => {
            if (!menu.children || !menu.children.length) {
              return (
                <Menu.Item key={menu.path}>
                  {menu.meta?.icon && (
                    <span class={`iconfont ${menu.meta.icon} menu-icon`}></span>
                  )}
                  <span>{menu.meta?.title}</span>
                </Menu.Item>
              )
            } else {
              return SubItem(menu)
            }
          })}
        </Menu>
      </div>
    )
  },
})

export default Menus
