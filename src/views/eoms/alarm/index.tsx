import { defineComponent } from 'vue'

import styles from './index.module.less'

const Alarm = defineComponent({
  name: 'Alarm',
  setup() {
    return () => <div>这是内容区</div>
  },
})

export default Alarm
