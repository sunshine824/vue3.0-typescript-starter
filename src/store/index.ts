import { createPinia } from 'pinia'
import piniaStorePersist from '@/plugins/pinia-persist/pinia-store-persist'

const store = createPinia().use(piniaStorePersist)

export default store
