import { defineComponent, watch, ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import ABreadCrumb from '@/components/ABreadCrumb'

import styles from './index.module.less'

const RouteLayout = defineComponent({
  name: 'RouteLayout',
  props: {
    isSubView: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { slots }) {
    const route = useRoute()
    const routeName = ref(route.meta?.title) // 当前路由title

    watch(route, (val) => {
      routeName.value = val.meta?.title
    }) // 监听路由变化

    return () => (
      <div class={styles['page-view']}>
        <div class={styles['top-info']}>
          <ABreadCrumb></ABreadCrumb>
        </div>
        <div class={styles['view-con']}>
          {props.isSubView ? <RouterView /> : slots.default?.()}
        </div>
      </div>
    )
  },
})

export default RouteLayout
