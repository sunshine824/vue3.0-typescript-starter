import { defineComponent } from 'vue'
import { RouteLayout } from '@/layouts'

import styles from './index.module.less'

const CustomMaterial = defineComponent({
  name: 'CustomMaterial',
  setup() {
    return () => <div>自定义素材</div>
  },
})

export default CustomMaterial
