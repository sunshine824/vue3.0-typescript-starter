import { defineComponent } from 'vue'
import ExceptionPage from '@/components/Exception'

const Exception500 = defineComponent({
  name: 'Exception500',
  setup() {
    return () => <ExceptionPage type="404"></ExceptionPage>
  },
})

export default Exception500
