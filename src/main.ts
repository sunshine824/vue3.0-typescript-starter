import { createApp } from 'vue'
import store from './store'
import router from './router'
import App from './App'
import Antd from 'ant-design-vue'

import '@/mock'

import './public/css/base.css'
import './public/css/init.less'
import '@/public/font/iconfont.css'
import 'ant-design-vue/dist/antd.css'

const app = createApp(App)

app.use(router).use(Antd).use(store).mount('#app')
