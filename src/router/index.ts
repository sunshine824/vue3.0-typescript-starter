import { createRouter, createWebHashHistory } from 'vue-router'
import { mainRoutes, baseRoutes } from './router.config'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [mainRoutes].concat(baseRoutes)
})

router.beforeEach((to, from, next) => {
  next()
})

export default router 