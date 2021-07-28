import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'

import styles from './index.module.less'

const Home = defineComponent({
  name: 'Home',
  setup(props) {
    const store = useStore(key)

    const count = computed(() => {
      return store.getters.getCount
    })
    const addCountNum = () => {
      store.commit('setCountNum')
    }
    return () => (
      <div class={styles.home}>
        <button onClick={addCountNum}>count is: {count.value}</button>
      </div>
    )
  },
})

export default Home
