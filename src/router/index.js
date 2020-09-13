import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import Home from '../components/Home.vue'
import Details from '@/components/Details.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/index' },
  {
    path: '/index',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/result/:search',
    name: 'Home',
    component: Home
  },
  {
    path: '/details/:param',
    name: 'Details',
    component: Details,
    children:[
      // {path:':episode(\\d+)' },
      {path:':episode' },
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})
export default router
