import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/info',
      name: 'info',
      component: () => import('./views/Info.vue')
    },
    {
      path: '/tds',
      name: 'tds',
      component: () => import('./views/Tds.vue')
    },
    {
      path: '/pepkg',
      name: 'pepkg',
      component: () => import('./views/Pepkg.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('./views/Order.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
