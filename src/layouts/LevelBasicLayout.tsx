import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { Layout, Dropdown } from 'ant-design-vue'
import { GlobalHeader, Menus } from '@/components/GlobalHeader'

import styles from './index.module.less'
import UserIcon from '../assets/user.png'

const LevelBasicLayout = defineComponent({
  name: 'LevelBasicLayout',
  setup() {
    const slots = {
      content: () => (
        <>
          {/* 导航栏 */}
          <Menus></Menus>
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
          <div class={styles['level-sub-menu']}></div>
          <Layout.Content>
            <RouterView />
          </Layout.Content>
        </div>
      </Layout>
    )
  },
})

export default LevelBasicLayout
