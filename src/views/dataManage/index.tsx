import { defineComponent } from 'vue'
import { RouteLayout } from '@/layouts'

import styles from './index.module.less'

const DataManage = defineComponent({
  name: 'DataManage',
  setup() {
    const slots = {
      default: () => <div>数据管理</div>,
    }
    return () => <RouteLayout v-slots={slots} isSubView={false}></RouteLayout>
  },
})

export default DataManage
