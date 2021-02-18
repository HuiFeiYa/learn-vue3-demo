import { createRouter, createWebHistory } from 'vue-router'
export default createRouter({
  history:createWebHistory(),
  routes:[
    {
      path:'/vue/model',
      component:import('../view/model/Model.vue')
    },
    {
      path:'/vue/bind',
      component: import('../view/vbind/vBind.vue')
    },
    {
      path:'/vue/emit',
      component: import('../view/emit/Index.vue')
    },
    {
      path: '/vue/ref',
      component: import('../view/ref/index.vue')
    }
  ]
})