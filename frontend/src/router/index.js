import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import Main from "../components/Main.vue"
import selectMap from "../components/SelectMap.vue"

import Login from "../components/user/Login.vue"
import Profile from "../components/user/Profile.vue"

Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "MAIN",
    component: Main,
  },
  {
    path:'/user/login',
    name: 'userLogin',
    component: Login,
  },
  {
    path: '/user/profile',
    name: 'userProfile',
    component: Profile,
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
