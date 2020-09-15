import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 由于此库没有相关的 d.ts 文件，可以在 src/shims-vue.d.ts 中声明
// 否则会报错：Cannot find module 'vue-icon-font-pro' or its corresponding type declarations.
import VueIconFont from 'vue-icon-font-pro'
import '@/assets/iconfont.js'
Vue.config.productionTip = false
Vue.use(VueIconFont)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
