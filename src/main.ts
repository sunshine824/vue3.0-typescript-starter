import { createApp } from 'vue'
import { store, key } from './store'
import router from './router'
import App from './App'
import { setupAntd } from './plugins/antd'

import '@/mock';

import './public/css/base.css'
import './public/css/init.less'
import '@/public/font/iconfont.css';
import 'ant-design-vue/dist/antd.css';

const app = createApp(App)

setupAntd(app)
app.use(router)
app.use(store, key)

app.mount('#app')
