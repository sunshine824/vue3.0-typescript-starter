import { defineComponent, watch, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Breadcrumb } from 'ant-design-vue'

import styles from './index.module.less'

const ABreadCrumb = defineComponent({
  name: 'ABreadCrumb',
  setup({ props }) {
    const route = useRoute()

    onMounted(() => {
      console.log(breadList)
    })

    // 监听路由变化
    const breadList = computed(() => {
      const paths = route.path.split('/')
    })

    return () => (
      <div class={styles['bread-crumb']}>
        <span class={styles['location']}>当前位置：</span>
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Application</Breadcrumb.Item>
          <Breadcrumb.Item>Center</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
  },
})

export default ABreadCrumb
