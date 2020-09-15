import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'

import Login from "../components/Login.vue"

Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.use(VueRouter)

const routes = [
  {
    path:'/user/login',
    name: 'userLogin',
    component: Login,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;
