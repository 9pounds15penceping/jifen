import Vue from 'vue'
import "reset-css"
import "@/assets/css/global.css"
import App from './App.vue'
import router from './router'
import store from './store'
import SlideVerify from 'vue-monoplasty-slide-verify'

Vue.use(SlideVerify)
Vue.config.productionTip = false
Vue.prototype.imgBaseUrl = "https://sc.wolfcode.cn"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
 