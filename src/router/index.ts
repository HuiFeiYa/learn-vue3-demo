import { createRouter, createWebHistory } from 'vue-router'
export default createRouter({
  history:createWebHistory(),
  routes:[
    {
      path:'/vue/model',
      component:import('../view/model/Model.vue')
    }
  ]
})