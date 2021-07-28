import { defineComponent } from 'vue'
import Types from './type'

import styles from './index.module.less'

const ExceptionPage = defineComponent({
  name: 'ExceptionPage',
  props: {
    type: {
      type: String,
      default: '404',
    },
  },
  setup(props) {
    return () => (
      <div class={styles.exception}>
        <div class={styles.imgBlock}>
          <div
            class={styles.imgEle}
            style={{ backgroundImage: `url(${Types[props.type].img})` }}
          ></div>
        </div>
        <div class={styles.content}>
          <h1>{Types[props.type].title}</h1>
          <div class={styles.desc}>{Types[props.type].desc}</div>
        </div>
      </div>
    )
  },
})

export default ExceptionPage
