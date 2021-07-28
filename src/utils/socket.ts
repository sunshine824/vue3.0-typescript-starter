/*
 * @Author: chenxin
 * @Description: socket封装
 */
export default class Socket {
  public url = ''; // socket服务地址

  public callback: {
    [key: string]: any
  } = {}; // 全局socket回调

  public instance: any = null; // socket实例

  constructor({ url }: { url: string }) {
    this.url = url;
    this.init();
  }

  // 初始化socket连接
  init() {
    const instance: WebSocket = new WebSocket(`ws://${this.url}`);
    // 接收返回数据
    instance.onmessage = (e) => {
      const res = JSON.parse(e.data);
      this.callback[res.type]
        ? this.callback[res.type](res.data)
        : console.warn('接收数据失败，无对应回调');
    };
    // 关闭socket连接
    instance.onclose = (e) => {
      console.warn(`connect closed(${e.code})`);
      // 重连websocket
      setTimeout(() => {
        this.init();
      }, 1000);
    };
    // 连接成功
    instance.onopen = () => {
      console.log('连接成功！');
    };
    // socket连接失败
    instance.onerror = () => {
      console.warn('websocket连接失败！');
    };
    this.instance = instance;
  }

  // 添加回调
  addCallback(type: string, callback: any) {
    this.callback[type] = callback;
  }

  // 移除回调
  removeCallback(type: string) {
    this.callback[type]
      ? delete this.callback[type]
      : console.warn('未找到对应回调，无法删除！');
  }

  // 发送数据
  send(data: any) {
    if (this.instance.readyState == this.instance.OPEN) {
      this.instance.send(JSON.stringify(data));
    } else {
      setTimeout(() => {
        this.send(data);
      }, 1000);
    }
  }

  // 关闭socket连接
  close() {
    this.instance && this.instance.close();
  }
}
