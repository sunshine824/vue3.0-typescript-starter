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
}

export const CommonStore = defineStore('common', {
  // 状态库
  state: (): CommonState => ({
    userInfo: null, //用户信息
  }),
  getters: {
    getUserInfo: (state) => state.userInfo?.userInfo,
  },
  actions: {
    setUserInfo(data: NonNullable<IUserInfoProps>) {
      this.userInfo = data
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        //storage: localStorage,
        paths: ['userInfo'],
      },
    ],
  },
})
