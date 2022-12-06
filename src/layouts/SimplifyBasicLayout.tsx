import { defineComponent, computed } from 'vue'
import { CommonStore } from '@/store/modules/common'
import { storeToRefs } from 'pinia'
import { Layout, Dropdown, Menu } from 'ant-design-vue'
import { GlobalHeader, Menus } from '@/components/GlobalHeader'
import { RouterView, RouteRecordRaw, useRouter, useRoute } from 'vue-router'
import { MenuFoldOutlined, MenuUnfoldOutlined, CaretDownOutlined } from '@ant-design/icons-vue'

import styles from './index.module.less'
import UserIcon from '../assets/head.jpg'
import Logo from '../assets/logo.png'

const SimplifyBasicLayout = defineComponent({
	name: 'SimplifyBasicLayout',
	setup() {
		const router = useRouter()
		const common = CommonStore()
		// common store data
		const { getUserInfo } = storeToRefs(common)

		// 获取路由列表
		const getMenus = () => {
			let menuList: RouteRecordRaw[] = []
			const routes: Array<RouteRecordRaw> = router.options?.routes || []
			routes.forEach(item => {
				if (item.path == '/') {
					menuList = item.children || []
				}
			})
			return JSON.parse(JSON.stringify(menuList))
		}

		// 获取显示状态的路由
		const menuLists = computed(() => {
			return getMenus().filter((item: any) => !item?.meta?.hidden)
		})

		// 退出
		const exit = () => {
			localStorage.clear()
			router.push('/login')
		}

		const handleInlineCollapsed = () => {
			common.setInlineCollapsed()
		}

		const menuSlots = {
			overlay: () => (
				<Menu>
					<Menu.Item>
						<span onClick={exit}>退出</span>
					</Menu.Item>
				</Menu>
			)
		}

		const slots = {
			leftContent: () => (
				<>
					<div class="menu-fold" onClick={handleInlineCollapsed}>
						{common.inlineCollapsed ? <MenuUnfoldOutlined class="menu-fold-icon" /> : <MenuFoldOutlined class="menu-fold-icon" />}
					</div>
				</>
			),
			content: () => (
				<>
					{/* 用户信息 */}
					<div class="user-info">
						<Dropdown v-slots={menuSlots}>
							<div>
								<img src={UserIcon} class="user-head" />
								<CaretDownOutlined class="down-lined" />
							</div>
						</Dropdown>
					</div>
				</>
			)
		}
		return () => (
			<div class={styles['simplify-layout']}>
				{/* 导航栏 */}
				<div class="layout-sider" class={common.inlineCollapsed ? 'collapsed-layout-sider' : ''}>
					<div class="left-logo">
						<img src={Logo} />
						{
							!common.inlineCollapsed ? <span class="h1-title">智慧城市监控平台</span> : null
						}
					</div>
					<Menus class="left-menu" menuLists={menuLists['value']} mode="inline"></Menus>
				</div>
				<div class="level-right">
					<GlobalHeader v-slots={slots}></GlobalHeader>
					<Layout.Content>
						<RouterView />
					</Layout.Content>
				</div>
			</div>
		)
	}
})

export default SimplifyBasicLayout
