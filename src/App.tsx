import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
  name: 'App',
  components: { RouterView },
  setup() {
    return () => <router-view />
  },
})
