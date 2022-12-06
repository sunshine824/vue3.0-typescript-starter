import { defineStore } from 'pinia'

interface IUserInfoProps {
	token: string
	userInfo: {
		address: string
		username: string
	}
}

interface CommonState {
	userInfo: IUserInfoProps | null
	inlineCollapsed: boolean
}

export const CommonStore = defineStore('common', {
	// 状态库
	state: (): CommonState => ({
		userInfo: null, //用户信息
		inlineCollapsed: false // 左侧菜单收缩状态
	}),
	getters: {
		getUserInfo: state => state.userInfo?.userInfo
	},
	actions: {
		setUserInfo(data: NonNullable<IUserInfoProps>) {
			this.userInfo = data
		},
		setInlineCollapsed() {
			this.inlineCollapsed = !this.inlineCollapsed
		}
	},
	persist: {
		enabled: true,
		strategies: [
			{
				storage: localStorage,
				paths: ['userInfo']
			}
		]
	}
})
