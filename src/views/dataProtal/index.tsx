import { defineComponent } from 'vue'
import { RouteLayout } from '@/layouts'

import styles from './index.module.less'

const DataProtal = defineComponent({
  name: 'DataProtal',
  setup() {
    const slots = {
      default: () => <div>数据门户</div>,
    }
    return () => <RouteLayout v-slots={slots} isSubView={false}></RouteLayout>
  },
})

export default DataProtal
