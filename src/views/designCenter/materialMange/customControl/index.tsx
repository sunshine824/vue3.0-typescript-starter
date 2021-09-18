import { defineComponent } from 'vue'
import { RouteLayout } from '@/layouts'

import styles from './index.module.less'

const CustomControl = defineComponent({
  name: 'CustomControl',
  setup() {
    return () => <div>自定义控件</div>
  },
})

export default CustomControl
