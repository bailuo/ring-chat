import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import request from "@/ajax";//没封装就直接写---import axios from "axios";
import VueCookies from 'vue-cookies'

Vue.prototype.$request = request;//没封装就axios直接赋值给这个
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueCookies)
Vue.$cookies.config('1d')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
