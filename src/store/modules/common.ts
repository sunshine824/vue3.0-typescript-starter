import { defineStore } from 'pinia'

export const CommonStore = defineStore('common', {
  // 状态库
  state: () => ({
    userInfo: {}, //用户信息
  }),
  getters: {
    getUserInfo: (state) => state.userInfo?.userInfo,
  },
  actions: {
    setUserInfo<T>(data: T) {
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
