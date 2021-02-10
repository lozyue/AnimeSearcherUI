import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '../Pages/HelloWorld.vue'
import Home from '../Pages/Home.vue'

import Details from '@/Pages/Details.vue'
import TVLive from '@/Pages/TVLive.vue'

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
      {path:':episode' },
    ]
  },
  {
    path:'/tvlive',
    name:'tvlive',
    component: TVLive,
    children:[
      {path:':tvEpisode'}
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
