import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import createDirective from './directive/index'
const app = createApp(App)
app.use(router)
createDirective(app)
router.isReady().then(() => {
  app.mount('#app')

})