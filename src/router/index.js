import { createRouter, createWebHistory } from 'vue-router'
import ManageHomeView from '../views/BunkerView.vue'

const routes = [
  {
    path: '/',
    name: 'bunker',
    component: ManageHomeView
  },
  {
    path: '/dokum',
    name: 'dokum',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DokumView.vue')
  },
  {
    path: '/dokset',
    name: 'dokset',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DokumsetView.vue')
  },

  //{
  //  path: '/manage',
  //  name: 'manage',
  //  // route level code-splitting
  //  // this generates a separate chunk (about.[hash].js) for this route
  //  // which is lazy-loaded when the route is visited.
  //  component: () => import(/* webpackChunkName: "about" */ '../views/ManageView.vue')
  //},

  {
    path: '/manage',
    name: 'manage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ManageView.vue')
  },

  {
    path: '/recine',
    name: 'recine',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/RecineView.vue')
  },
  {
    path: '/hucre',
    name: 'hucre',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Hucre.vue')
  },
  {
    path: '/bunrap',
    name: 'bunrap',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/BunkerRaporView.vue')
  },
  {
    path: '/uretim',
    name: 'uretim',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/UretimView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
