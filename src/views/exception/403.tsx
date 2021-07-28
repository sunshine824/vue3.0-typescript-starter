import { defineComponent } from 'vue'
import ExceptionPage from '@/components/Exception'

const Exception403 = defineComponent({
  name: 'Exception403',
  setup() {
    return () => <ExceptionPage type="403"></ExceptionPage>
  },
})

export default Exception403
