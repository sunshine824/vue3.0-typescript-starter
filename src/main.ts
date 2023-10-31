import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from '@/i18n'
import store from '@/store'
import actions from '@/shared/actions'
import directives from '@/directive'
import * as Utils from '@/utils/util'
import { $bus } from '@/utils/const'
import Components from '@/components'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import '@/public/css/base.css'
import '@/public/css/reset.less'
import { CommonStore } from './store/modules/common'

const app = createApp(App)

// 全局声明
declare module 'vue' {
  export interface ComponentCustomProperties {
    $t: any
  }
}

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.config.globalProperties.$bus = $bus
app.config.globalProperties.$utils = Utils

const render = (props: any = {}) => {
  console.log(props)
  const { container } = props
  if (props) {
    // 注入 actions 实例
    actions.setActions(props)
  }
  window.$ParentRouter = props.parentRouter
  app
    .use(router)
    .use(i18n)
    .use(directives)
    .use(Components)
    .use(store)
    .mount(container ? container.querySelector('#app') : '#app')
  // 存储主应用传递的登录信息
  CommonStore().setLoginInfo(props.loginInfo)
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

/**
 * bootstrap ： 在微应用初始化的时候调用一次，之后的生命周期里不再调用
 */
export async function bootstrap() {
  console.log('bootstrap')
}

/**
 * mount ： 在应用每次进入时调用
 */
export async function mount(props: any) {
  console.log('mount', props)
  render(props)
}

/**
 * unmount ：应用每次 切出/卸载 均会调用
 */
export async function unmount() {
  console.log('unmount')
  app.unmount()
}
