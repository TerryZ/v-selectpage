import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('./ExamplesIndex.vue'),
    redirect: '/core',
    children: [
      { path: '/core', component: () => import('./ExamplesCore.vue') },
      { path: '/list', component: () => import('./ExamplesListView.vue') },
      { path: '/table', component: () => import('./ExamplesTableView.vue') }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export { router }
