import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { Layout } from 'ant-design-vue'
import GlobalHeader from '@/components/GlobalHeader/GlobalHeader'

import styles from './index.module.less'

const LevelBasicLayout = defineComponent({
  name: 'LevelBasicLayout',
  setup() {
    const slots = {
      content: () => <div></div>,
    }
    return () => (
      <Layout class={styles['level-layout']}>
        <GlobalHeader slots={slots}></GlobalHeader>
        <Layout.Content>
          <RouterView />
        </Layout.Content>
      </Layout>
    )
  },
})

export default LevelBasicLayout
