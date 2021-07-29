import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { Layout } from 'ant-design-vue'
import { GlobalHeader, Menus } from '@/components/GlobalHeader'

import styles from './index.module.less'

const LevelBasicLayout = defineComponent({
  name: 'LevelBasicLayout',
  setup() {
    const slots = {
      content: () => <Menus></Menus>,
    }
    return () => (
      <Layout class={styles['level-layout']}>
        <GlobalHeader v-slots={slots}></GlobalHeader>
        <Layout.Content>
          <RouterView />
        </Layout.Content>
      </Layout>
    )
  },
})

export default LevelBasicLayout
