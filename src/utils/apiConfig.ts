export const ApiConfig: any = {
  // 开发环境
  development: {
    OrderPortalSocket: 'ws://192.168.1.241:10088/OrderPortalSocket',
    OrderPortalFront: 'http://192.168.1.241:10087/OrderPortalFront'
  },
  // 本地测试
  localTest: {
    OrderPortalSocket: 'ws://192.168.1.241:10088/OrderPortalSocket',
    OrderPortalFront: 'http://192.168.1.241:10087/OrderPortalFront'
  },
  // 测试环境
  testing: {
    OrderPortalSocket: 'wss://order.jeemaa.cn/OrderPortalSocket',
    OrderPortalFront: 'https://order.jeemaa.cn/OrderPortalFront'
  },
  // 生产环境
  production: {
    OrderPortalSocket: 'wss://order.jeemaa.com/OrderPortalSocket',
    OrderPortalFront: 'https://order.jeemaa.com/OrderPortalFront'
  }
}
