import { CommonStore } from '@/store/modules/common'

// 心跳检测
class HeartCheck {
  websocket = null
  connectionTimeout = 10 * 1000 // 重连时间
  timeout = 30000 // 30s发一次心跳
  timeoutobj = null
  lockReconnect = false //是否真正建立连接
  constructor({ websocket }) {
    this.websocket = websocket
  }
  reset() {
    clearTimeout(this.timeoutObj)
    return this
  }
  start() {
    this.timeoutObj = setInterval(() => {
      const websocket = this.websocket
      // 这里发送一个心跳，后端收到后，返回一个心跳消息，
      // onmessage拿到返回的心跳就说明连接正常
      if (websocket.readyState === 1) {
        // websocket.send('ping')
        if (localStorage.getItem('ymw_token')) {
          websocket.send('ping:' + localStorage.getItem('ymw_token'))
        } else {
          websocket.send('ping')
        }
      }
      if (websocket.readyState === 2 || websocket.readyState === 3) {
        websocket.close()
      }
    }, this.timeout)
  }
}

export default class Socket {
  url = '' // ws地址
  heartCheck = {} // 心跳对象
  websocket = null // ws对象
  callback = {} // 回调函数集合
  isReconnect = true // 关闭sockt是否重连
  socketData = {} // 保存分割socket数据
  constructor({ url, success }) {
    this.url = url
    this.initSocket(false, success)
  }
  // 自动重连
  reconnect() {
    //避免ws重复连接
    if (this.heartCheck.lockReconnect) return
    this.heartCheck.lockReconnect = true
    setTimeout(() => {
      this.initSocket(true)
      this.heartCheck.lockReconnect = false
    }, this.heartCheck.connectionTimeout)
  }
  // 拼接socket分割数据
  spliceSocketSplitData(data) {
    if (!this.socketData[data.uid]) {
      this.socketData[data.uid] = data.content
    } else {
      this.socketData[data.uid] += data.content
    }
    if (!data.index) {
      // 拼接结束
      const content = JSON.parse(this.socketData[data.uid])
      this.callback[content.uuid] ? this.callback[content.uuid](content) : this.callback[content.type](content)
    }
  }
  // 初始化socket
  initSocket(isReconnect, success) {
    if (isReconnect) {
      this.websocket.close()
    }
    const token = localStorage.getItem('ymw_token')
    const websocket = new WebSocket(`${this.url}/websocket`, [token])
    // 心跳对象
    this.heartCheck = new HeartCheck({ websocket })

    // 接收服务端信息
    websocket.onmessage = (e) => {
      //拿到任何消息都说明当前连接是正常的 心跳检测重置
      this.heartCheck.reset().start()
      if (e.data !== 'pongtoken' && e.data !== 'pong' && e.data != 'pongbroken') {
        const res = JSON.parse(e.data || null)
        if (res.isSplit) {
          // 拼接socket分割数据
          this.spliceSocketSplitData(res)
        } else {
          const content = JSON.parse(res.content || null)
          if (content.type == 0) {
            if (content.result?.socketId) {
              try {
                CommonStore()
              } catch (error) {
                // 如果报错说明是第一次挂载（避免重复创建Vue实例）
                success && success()
              }
              const commonStore = CommonStore()
              commonStore.initScoket(content)
            }
          } else {
            let callback = this.callback[content.uuid]
            if (!callback) {
              callback = this.callback[content.type]
            }
            callback ? callback(content) : console.log('未找到对应的回调！')
          }
        }
      }
    }

    // 连接成功
    websocket.onopen = () => {
      console.info('websocket连接成功！')
      this.heartCheck.reset().start()
    }

    // socket连接失败
    websocket.onerror = () => {
      console.warn('websocket连接失败！')
      if (this.isReconnect) {
        this.reconnect()
      }
    }

    // socket连接关闭
    websocket.onclose = (e) => {
      console.warn(`connect closed(${e.code})`)
      if (this.isReconnect) {
        this.reconnect()
      }
    }
    this.websocket = websocket
  }
  // 添加回调
  addCallback(type, callback) {
    this.callback[type] = callback
  }
  // 移除回调
  removeCallback(type) {
    this.callback[type] ? delete this.callback[type] : console.warn('未找到对应回调，无法删除！')
  }
  // 发送数据
  send(data) {
    if (this.websocket.readyState == this.websocket.OPEN) {
      this.websocket.send(JSON.stringify(data))
    } else {
      setTimeout(() => {
        this.send(data)
      }, 1000)
    }
  }
  // 关闭socket连接
  close() {
    this.isReconnect = true
    this.websocket && this.websocket.close()
  }
}
