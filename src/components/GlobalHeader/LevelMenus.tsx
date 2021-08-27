import { defineComponent, ref, watch } from 'vue'
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router'
import router from '../../router'

import styles from './index.module.less'

const LevelMenus = defineComponent({
  name: 'LevelMenus',
  props: {
    menuLists: {
      type: Array,
      default: [],
    },
  },
  setup(props, { slots }) {
    const route = useRoute() // 路由实例

    const router = useRouter()

    const baseUrl = ref(route.path.split('/')) // 当前跳转基础路由

    // 路由跳转
    const skipTo = (item: RouteRecordRaw) => {
      router.push(item.path)
    }

    // 监听路由变化
    watch(route, (val) => {
      baseUrl.value = val.path.split('/')
    })

    return () => (
      <div class={styles['level-menus']}>
        <ul class={styles['level-menus-list']}>
          {(props.menuLists as RouteRecordRaw[]).map((menu) => {
            return (
              <li
                onClick={skipTo.bind(this, menu)}
                class={menu.name == baseUrl.value[1] && styles['active']}
              >
                <span class={`iconfont ${menu?.meta?.icon} menu-icon`}></span>
                <span class={styles['title']}>{menu?.meta?.title}</span>
              </li>
            )
          })}
        </ul>
      </div>
    )
  },
})

export default LevelMenus
