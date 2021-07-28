import { createApp } from 'vue'
import { store, key } from './store'
import router from './router'
import App from './App'
import { setupAntd } from './plugins/antd'

const app = createApp(App)

setupAntd(app)
app.use(router)
app.use(store, key)

app.mount('#app')
