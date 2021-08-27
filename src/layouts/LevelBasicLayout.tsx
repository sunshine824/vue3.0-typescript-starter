import { defineComponent, computed } from 'vue'
import { RouterView, RouteRecordRaw, useRouter, useRoute } from 'vue-router'
import { Layout, Dropdown } from 'ant-design-vue'
import { GlobalHeader, Menus, LevelMenus } from '@/components/GlobalHeader'

import styles from './index.module.less'
import UserIcon from '../assets/user.png'

const LevelBasicLayout = defineComponent({
  name: 'LevelBasicLayout',
  setup() {
    // 获取显示状态的路由
    const menuLists = computed(() => {
      const menus = getMenus().filter((item: any) => !item?.meta?.hidden)
      menus.forEach((item: any) => {
        if (item.children) {
          // 只取第一层
          delete item.children
        }
      })
      return menus
    })

    // 获取子路由
    const subMenuLists = computed(() => {
      let menus: RouteRecordRaw[] = []
      const names = useRoute().path.split('/')
      if (names.length) {
        getMenus().forEach((item) => {
          if (item.name == names[1]) {
            menus = item?.children || []
          }
        })
      }
      return menus
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
      return JSON.parse(JSON.stringify(menuList))
    }
    const slots = {
      content: () => (
        <>
          {/* 导航栏 */}
          <LevelMenus menuLists={menuLists['value']}></LevelMenus>
          {/* 用户信息 */}
          <div class={styles['user-info']}>
            <Dropdown>
              <div>
                <img src={UserIcon} class={styles['user-head']} />
                <a class={styles['user-name']}>admin</a>
              </div>
            </Dropdown>
          </div>
        </>
      ),
    }
    return () => (
      <Layout class={styles['level-layout']}>
        <GlobalHeader v-slots={slots}></GlobalHeader>
        <div class={styles['level-content']}>
          {/* 侧边子目录 */}
          {subMenuLists['value'].length ? (
            <div class={styles['vertical-sub-menu']}>
              <Menus menuLists={subMenuLists['value']} mode="inline"></Menus>
            </div>
          ) : (
            ''
          )}
          {/* 右侧内容区 */}
          <Layout.Content>
            <RouterView />
          </Layout.Content>
        </div>
      </Layout>
    )
  },
})

export default LevelBasicLayout
