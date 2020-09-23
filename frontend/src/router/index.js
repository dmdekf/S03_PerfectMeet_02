import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import BootstrapVue from "bootstrap-vue";
import Main from "../components/Main.vue";
import selectMap from "../components/SelectMap.vue";
import selectUserInfo from "../components/SelectUserInfo.vue";
import Login from "../components/Login.vue";

<<<<<<< HEAD
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
=======
Vue.use(BootstrapVue);
Vue.use(Vuex);
Vue.use(VueRouter);

const routes = [
  {
    path: "/user/login",
    name: "userLogin",
>>>>>>> 9457c790248528c481be018f2352e396e8d43e72
    component: Login,
  },
  {
    path: '/user/profile',
    name: 'userProfile',
    component: Profile,
  },
  {
    path: "/user/selectMap",
    name: "SELECTMAP",
    component: selectMap,
  },
  {
    path: "/user/selectUserInfo",
    name: "SELECTUSERINFO",
    component: selectUserInfo,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
