import { createRouter, createWebHashHistory } from 'vue-router'

import { routers } from './store'

const routes = [{
  path: '/',
  component: () => import('./ExamplesIndex.vue'),
  redirect: '/core/list',
  children: routers
}]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export { router }
