import { defineComponent } from 'vue'
import { RouteLayout } from '@/layouts'

import styles from './index.module.less'

const UserManage = defineComponent({
  name: 'userManage',
  setup() {
    const slots = {
      default: () => <div>用户管理</div>,
    }
    return () => <RouteLayout v-slots={slots} isSubView={false}></RouteLayout>
  },
})

export default UserManage
