import { defineComponent, computed } from 'vue'
import { Layout, Dropdown, Menu } from 'ant-design-vue'
import { GlobalHeader, Menus } from '@/components/GlobalHeader'
import { RouterView, RouteRecordRaw, useRouter, useRoute } from 'vue-router'

import styles from './index.module.less'
import UserIcon from '../assets/user.png'

const SimplifyBasicLayout = defineComponent({
  name: 'SimplifyBasicLayout',
  setup() {
    const router = useRouter()

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

    // 获取显示状态的路由
    const menuLists = computed(() => {
      return getMenus().filter((item: any) => !item?.meta?.hidden)
    })

    // 退出
    const exit = () => {
      sessionStorage.clear()
      router.push('/login')
    }

    const menuSlots = {
      overlay: () => (
        <Menu>
          <Menu.Item>
            <span onClick={exit}>退出</span>
          </Menu.Item>
        </Menu>
      ),
    }

    const slots = {
      content: () => (
        <>
          {/* 用户信息 */}
          <div class={styles['user-info']}>
            <Dropdown v-slots={menuSlots}>
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
          {/* 导航栏 */}
          <div class={styles['vertical-sub-menu']}>
            <Menus menuLists={menuLists['value']} mode="inline"></Menus>
          </div>
          <Layout.Content>
            <RouterView />
          </Layout.Content>
        </div>
      </Layout>
    )
  },
})

export default SimplifyBasicLayout
