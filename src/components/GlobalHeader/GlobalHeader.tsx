import { defineComponent } from 'vue'
import { Layout } from 'ant-design-vue'

import styles from './index.module.less'
import Logo from '../../assets/logo.png'

const GlobalHeader = defineComponent({
  name: 'GlobalHeader',
  setup(props, { slots }) {
    return () => (
      <div class={styles['header-animat']}>
        <Layout.Header>
          <div class="logo">
            <img src={Logo} />
            <span class="txt">智慧城市监控平台</span>
          </div>
          <div class={styles['right-con']}>{slots.content?.()}</div>
        </Layout.Header>
      </div>
    )
  },
})

export default GlobalHeader
