import { defineComponent, computed, inject, ref } from 'vue'
import { RouterView, RouteRecordRaw, useRouter, useRoute } from 'vue-router'
import { Layout, Dropdown, Menu } from 'ant-design-vue'
import { CommonStore } from '@/store/modules/common'
import { storeToRefs } from 'pinia'
import { GlobalHeader, Menus, LevelMenus } from '@/components/GlobalHeader'

import styles from './index.module.less'
import UserIcon from '../assets/user.png'
import Logo from '../assets/logo.png'

const LevelBasicLayout = defineComponent({
  name: 'LevelBasicLayout',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const common = CommonStore()
    const lang = ref(localStorage.getItem('localLang') || 'zh-cn')
    // common store data
    const { getUserInfo } = storeToRefs(common)

    // 注入切换语言方法
    const changeLang = inject('changeLang')

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
      const names = route.path.split('/')
      if (names.length) {
        getMenus().forEach((item: RouteRecordRaw) => {
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
      const routes: Array<RouteRecordRaw> = router.options?.routes || []
      routes.forEach((item) => {
        if (item.path == '/') {
          menuList = item.children || []
        }
      })
      return JSON.parse(JSON.stringify(menuList))
    }

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
      leftContent: () => (
        <>
          <div class={styles['logo']}>
            <img src={Logo} />
            <span class={styles['txt']}>智慧城市监控平台</span>
          </div>
        </>
      ),
      content: () => (
        <>
          {/* 导航栏 */}
          <LevelMenus menuLists={menuLists['value']}></LevelMenus>
          {/* 语言切换 */}
          <div class={styles['switch-lang']}>
            <a-select onSelect={changeLang} v-model={[lang['value'], 'value']} style="width:100%" placeholder="语言切换">
              <a-select-option value='zh-cn'>中文</a-select-option>
              <a-select-option value='en'>英文</a-select-option>
            </a-select>
          </div>
          {/* 用户信息 */}
          <div class={styles['user-info']}>
            <Dropdown v-slots={menuSlots}>
              <div>
                <img src={UserIcon} class={styles['user-head']} />
                <a class={styles['user-name']}>
                  {getUserInfo['value']?.['username']}
                </a>
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
          ) : null}
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
