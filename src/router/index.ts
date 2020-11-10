import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/css/box-sizing',
    component: () => import('../views/css/BoxSizing/index.vue')
  },
  {
    path: '/css/flex-basis',
    component: () => import('../views/css/FlexBasis/index.vue')
  },
  {
    path: '/canvas/event/rotate',
    component: () => import('../views/canvas/events/rotate/index.vue')
  },
  {
    path: '/canvas/event/rect',
    component: () => import('../views/canvas/events/rect/index.vue')
  },
  {
    path: '/canvas/event/pointInPath',
    component: () => import('../views/canvas/events/pointInPath.vue')
  },
  {
    path: '/canvas/event/click',
    component: () => import('../views/canvas/events/click.vue')
  },
  {
    path: '/canvas/chapter4',
    component: () => import('../views/canvas/chapter4/index.vue')
  },
  {
    path: '/canvas/api',
    component: () => import('../views/canvas/chapter3/api.vue')
  },
  {
    path: '/canvas/base',
    component: () => import('../views/canvas/chapter2/base.vue')
  },
  {
    path: '/canvas/helloworld',
    component: () => import('../views/canvas/chapter1/helloword.vue')
  },
  {
    path: '/function/module',
    component:() => import('../views/function/module/index.vue')
  },
  {
    path: '/function/jsx',
    component: () => import('../views/function/jsx/index.vue')
  },
  {
    path: '/canvas/function/restore',
    component: () => import('../views/function/restore/index.vue')
  },
  {
    path: '/function/vue/update',
    component: () => import('../views/function/update/index.vue')
  },
  {
    path: '/function/reactData',
    component: () => import('../views/function/ReactData/index.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

  {
    path: '/todo/home',
    name: 'todoHome',
    component: () => import('../views/todoList/home.vue')
  },
  {
    path: '/todo/create',
    name: 'todoCreate',
    component: () => import('../views/todoList/create.vue')
  },
  {
    path: '/greenScreen/borderAnimation',
    name: 'BorderAnimation',
    component: () =>
      import('../views/greenScreen/coverCaption/borderAnimation.vue')
  },
  {
    path: '/greenScreen/beat',
    name: 'Beat',
    component: () => import('../views/greenScreen/coverCaption/beat.vue')
  },
  {
    path: '/greenScreen/text/slide',
    name: 'Side',
    component: () => import('../views/greenScreen/text/side/index.vue')
  },
  {
    path: '/greenScreen/template/exhibit',
    name: 'Exhibit',
    component: () => import('../views/greenScreen/template/exhibit/index.vue')
  },
  {
    path: '/anime/base',
    name: 'Base',
    component: () => import('../views/anime/base.vue')
  },
  {
    path: '/anime/slide',
    name: 'Slide',
    component: () => import('../views/anime/slide.vue')
  },
  {
    path: '/anime/path',
    name: 'Path',
    component: () => import('../views/anime/path.vue')
  },
  {
    path: '/anime/mark',
    name: 'Mark',
    component: () => import('../views/anime/mark.vue')
  },
  {
    path: '/ts/index',
    name: 'TsIndex',
    component: () => import('../views/ts/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
