import { defineComponent, ref, watch, computed, onMounted } from 'vue'
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
    menuLists: {
      type: Array,
      default: [],
    },
  },
  setup(props, { slots }) {
    const route = useRoute()
    const router = useRouter()
    const activeRoute = ref() // 当前路由

    onMounted(() => {
      activeRoute.value = route.path
    })

    // 默认展开项
    const openKeys = computed(() => {
      if (props.mode == 'inline') {
        return ['/designCenter/materialMange']
      }
      return []
    })

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
        <Menu.SubMenu key={menus.name}>
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
                        {menus.meta?.icon && (
                          <span
                            class={`iconfont ${menu.meta.icon} menu-icon`}
                          ></span>
                        )}
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
          {...({
            selectedKeys: [activeRoute.value],
            openKeys: openKeys.value,
            mode: props.mode,
            onClick: handleMenuClick,
          } as any)}
          style={{ lineHeight: '54px' }}
        >
          {(props.menuLists as RouteRecordRaw[]).map((menu) => {
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
