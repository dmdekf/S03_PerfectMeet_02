import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false

import './../node_modules/bulma/css/bulma.min.css'
import '@/assets/scss/app.scss'

new Vue({
  router, 
  render: h => h(App)
}).$mount('#app')
