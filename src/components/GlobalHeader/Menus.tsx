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
    const activeRoute = ref(route.path) // 当前路由

    const openKeys = computed(() => {
      if (props.mode == 'inline') {
        return ['/smart', '/eoms', '/system', '/database']
      }
      return []
    }) // 默认展开项

    const menuLists = computed(() => {
      return getMenus().filter((item) => !item?.meta?.hidden)
    }) // 获取显示状态的路由

    const getMenus = () => {
      let menuList: RouteRecordRaw[] = []
      const routes: Array<RouteRecordRaw> = useRouter().options?.routes || []
      routes.forEach((item) => {
        if (item.path == '/') {
          menuList = item.children || []
        }
      })
      return menuList
    } // 获取路由列表

    watch(route, (val) => {
      activeRoute.value = val.path
    }) // 监听路由变化

    return () => (
      <div
        class={`${styles['menu-class']} ${styles[props.mode + '-menu-class']}`}
      >
        <Menu
          theme="dark"
          selectedKeys={[activeRoute.value]}
          openKeys={openKeys.value}
          style={{ lineHeight: '54px' }}
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
            }
          })}
        </Menu>
      </div>
    )
  },
})

export default Menus
