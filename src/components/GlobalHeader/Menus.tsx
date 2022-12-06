import { defineComponent, ref, watch, computed, onMounted } from 'vue'
import { useRoute, useRouter, RouteRecordRaw } from 'vue-router'
import { Menu } from 'ant-design-vue'
import { CommonStore } from '@/store/modules/common'

import styles from './index.module.less'

const Menus = defineComponent({
  name: 'Menus',
  props: {
    mode: {
      type: String,
      default: 'horizontal'
    },
    menuLists: {
      type: Array,
      default: []
    }
  },
  setup(props) {
    const route = useRoute()
    const router = useRouter()
    const activeRoute = ref() // 当前路由
    const common = CommonStore()

    onMounted(() => {
      activeRoute.value = route.meta?.activePath || route.path
    })

    //  路由跳转
    const handleMenuClick = (item: { key: string }) => {
      router.push(item.key)
    }

    // 监听路由变化
    watch(route, val => {
      activeRoute.value = val.meta?.activePath || val.path
    })

    // 子级导航渲染
    const SubItem = (menus: any) => {
      return (
        <Menu.SubMenu key={menus.name}>
          {{
            icon: () => <span class={`iconfont ${menus.meta.icon} menu-icon`}></span>,
            title: () => (
              <>
                <span>{menus.meta?.title}</span>
              </>
            ),
            default: () => (
              <>
                {menus.children.map((menu: any) => {
                  if ((!menu.children || !menu.children.length)) {
                    if (!menu.meta?.hidden) {
                      return (
                        <Menu.Item key={menu.path} v-slots={menuIcons(menu)}>
                          <span>{menu.meta?.title}</span>
                        </Menu.Item>
                      )
                    } else {
                      return null
                    }
                  } else {
                    return SubItem(menu)
                  }
                })}
              </>
            )
          }}
        </Menu.SubMenu>
      )
    }

    const menuIcons = (menu:any) => {
      return {
        icon: () => (
          <span>
            <span class={`iconfont ${menu.meta.icon} menu-icon`}></span>
          </span>
        )
      }
    }

    return () => (
      <div class={`${styles['menu-class']} ${styles[props.mode + '-menu-class']}`}>
        <Menu
          {...({
            selectedKeys: [activeRoute.value],
            mode: props.mode,
            inlineCollapsed: common.inlineCollapsed,
            onClick: handleMenuClick
          } as any)}
          style={{ lineHeight: '54px' }}>
          {(props.menuLists as RouteRecordRaw[]).map(menu => {
            if (!menu.children || !menu.children.length) {
              if (!menu.meta?.hidden) {
                return (
                  <Menu.Item key={menu.path} v-slots={menuIcons(menu)}>
                    <span>{menu.meta?.title}</span>
                  </Menu.Item>
                )
              } else {
                return null
              }
            } else {
              return SubItem(menu)
            }
          })}
        </Menu>
      </div>
    )
  }
})

export default Menus
