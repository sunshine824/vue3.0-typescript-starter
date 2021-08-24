import { defineComponent } from 'vue'
import { RouteLayout } from '@/layouts'

import styles from './index.module.less'

const Database = defineComponent({
  name: 'Database',
  setup() {
    const slots = {
      default: () => <div>数据库配置</div>,
    }
    return () => <RouteLayout v-slots={slots} isSubView={false}></RouteLayout>
  },
})

export default Database
