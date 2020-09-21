import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import Main from "../components/Main.vue"
import selectMap from "../components/SelectMap.vue"

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
  {
    path: "/",
    name: "MAIN",
    component: Main,
  },
  {
    path:"/user/selectMap",
    name: "SELECTMAP",
    component: selectMap,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;
