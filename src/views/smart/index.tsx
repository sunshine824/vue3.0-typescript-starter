import { defineComponent } from 'vue'
import { RouteLayout } from '@/layouts'

import styles from './index.module.less'

const Smart = defineComponent({
  name: 'Smart',
  setup() {
    const slots = {
      default: () => <div>这是内容区</div>,
    }
    return () => <RouteLayout v-slots={slots} isSubView={false}></RouteLayout>
  },
})

export default Smart
