import { defineComponent } from 'vue'
import { RouteLayout } from '@/layouts'

import styles from './index.module.less'

const ScreenManage = defineComponent({
  name: 'ScreenManage',
  setup() {
    return () => <div>画面管理</div>
  },
})

export default ScreenManage
