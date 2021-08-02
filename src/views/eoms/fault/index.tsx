import { defineComponent } from 'vue'

import styles from './index.module.less'

const Fault = defineComponent({
  name: 'Fault',
  setup() {
    return () => <div>这是内容区</div>
  },
})

export default Fault
