import { defineComponent, onMounted, ref, watch } from 'vue'
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router'
import router from '../../router/dynamic'

import styles from './index.module.less'

const LevelMenus = defineComponent({
	name: 'LevelMenus',
	props: {
		menuLists: {
			type: Array,
			default: []
		}
	},
	setup(props, { slots }) {
		const route = useRoute() // 路由实例

		const router = useRouter()

		const baseUrl = ref() // 当前跳转基础路由

		onMounted(() => {
			const paths = route.path.split('/')
			if (paths.length > 1) {
				baseUrl.value = '/' + paths[1]
			}
		})

		// 路由跳转
		const skipTo = (item: RouteRecordRaw) => {
			router.push(item.path)
		}

		// 监听路由变化
		watch(route, val => {
			const paths = val.path.split('/')
			if (paths.length > 1) {
				baseUrl.value = '/' + paths[1]
			}
		})

		return () => (
			<div class={styles['level-menus']}>
				<ul class={styles['level-menus-list']}>
					{(props.menuLists as RouteRecordRaw[]).map(menu => {
						return (
							<li onClick={skipTo.bind(this, menu)} class={menu.path == baseUrl.value && styles['active']}>
								<span class={`iconfont ${menu?.meta?.icon} menu-icon`}></span>
								<span class={styles['title']}>{menu?.meta?.title}</span>
							</li>
						)
					})}
				</ul>
			</div>
		)
	}
})

export default LevelMenus
