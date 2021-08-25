import { defineComponent } from 'vue'
import { Breadcrumb } from 'ant-design-vue'

import styles from './index.module.less'

const ABreadCrumb = defineComponent({
  name: 'ABreadCrumb',
  setup({ props }) {
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
