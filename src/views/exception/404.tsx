import { defineComponent } from 'vue'
import ExceptionPage from '@/components/Exception'

const Exception404 = defineComponent({
  name: 'Exception404',
  setup() {
    return () => <ExceptionPage type="404"></ExceptionPage>
  },
})

export default Exception404
