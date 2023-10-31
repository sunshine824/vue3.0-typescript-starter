import CommonApi from '@/api/common'
import { clearLoginInfo } from '@/utils/util'
import to from 'await-to-js'
import { defineStore } from 'pinia'

type State = {
  socketId: string
  loginInfo: Partial<StoreState.ILoginInfo>
}

export const CommonStore = defineStore('common', {
  // 状态库
  state: (): State => {
    return {
      socketId: '', // 全局socketId
      loginInfo: {} //客户端用户信息
    }
  },
  getters: {
    getLoginInfo: (state) => state.loginInfo,
    getSocketId: (state) => state.socketId
  },
  actions: {
    setLoginInfo(data: Partial<StoreState.ILoginInfo>) {
      this.loginInfo = { ...this.loginInfo, ...data }
    },
    // 获取初始化Scoket数据
    initScoket(data: { code: number; result: { socketId: string } }) {
      const { code, result } = data
      if (code == 200) {
        this.socketId = result?.socketId
      }
    },
    // 退出登录
    async loginOut() {
      const [err, res] = await to(CommonApi.loginOut({}))
      if (res) {
        clearLoginInfo()
      }
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ['loginInfo']
      }
    ]
  }
})
