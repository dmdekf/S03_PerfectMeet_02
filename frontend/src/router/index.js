import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import BootstrapVue from "bootstrap-vue";
import Main from "../components/Main.vue";
import selectMap from "../components/SelectMap.vue";
import selectUserInfo from "../components/SelectUserInfo.vue";
import Login from "../components/user/Login.vue";
import Profile from "../components/user/Profile.vue";
import choice from "../components/SelectUserPurpose.vue";

import notice from "../components/board/Notice.vue";
import boardWrite from "../components/board/Write.vue";

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
    path: "/user/selectMap",
    name: "SELECTMAP",
    component: selectMap,
  },
  {
    path: "/user/selectUserInfo",
    name: "SELECTUSERINFO",
    component: selectUserInfo,
  },
  {
    path: "/user/selectUserPurpose",
    name: "SELECTUSERPURPOSE",
    component: choice,
  },
  {
    path: "/board/notice",
    name: "notice",
    component: notice,
  },
  {
    path: "/board/write",
    name: "boardWrite",
    component: boardWrite,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
