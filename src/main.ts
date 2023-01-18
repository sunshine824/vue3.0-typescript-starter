import { createApp } from 'vue'
import store from './store'
import router from './router'
import App from './App'
import i18n from './i18n'
import Antd from 'ant-design-vue'

import '@/mock'

import 'ant-design-vue/dist/antd.css'
import '@/public/css/base.css'
import '@/public/css/init.less'
import '@/public/font/iconfont.css'

const app = createApp(App)

app.use(router).use(Antd).use(i18n).use(store).mount('#app')
