import Vue from "vue";
import Vuex from "vuex";

import axios from "axios";
// import Cookies from 'js-cookie'

import router from "@/router";
// import createPersistedState from 'vuex-persistedstate';
const storagesession = window.sessionStorage;
const storagelocal = window.localStorage;
import SERVER from "@/api/api";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    token: "",
    email: "",
    status: "",
    nickname: "",
    login_user: "",
    auth_token: "",
    select_map: "",
    
    select_userinfo: {
      gender: "",
      age: "",
    },
    select_userpurpose: "",
    data_list: "",
    board_lists: []
  },
  getters: {
    info: (state) => ({
      status: state.status,
      token: state.token,
      auth_token: state.auth_token,
    }),
    isLoggedIn: (state) => !!state.token,
  },

  mutations: {
    SET_AUTHTOKEN(state, { auth_token }) {
      state.auth_token = auth_token;
    },
    SET_TOKEN(state, { token }) {
      state.token = token;
    },
    SET_EMAIL(state, { email }) {
      state.email = email;
    },
    SET_STATUS(state, { status }) {
      state.status = status;
    },
    SET_NICKNAME(state, { nickname }) {
      state.nickname = nickname;
    },
    SET_BOARDLISTS(state, { board_lists }) {
      state.board_lists = board_lists;
    },
  },
  actions: {
    postAuthData({ commit }, info) {
      axios
        .post(SERVER.URL + info.location, info.data)
        .then((res) => {
          commit("SET_TOKEN", res.headers["jwt-auth-token"]);
          router.push({ name: "Home" });
        })
        .catch((err) => console.log(err.response.data));
    },
    signup({ commit }, signupData) {
      axios({
        method: "post",
        url: SERVER.URL + "/user",
        data: {
          email: signupData.email,
          password: signupData.password,
          nickname: signupData.nickname,
        },
      })
        .then((res) => {
          if (res.data.status) {
            commit("SET_TOKEN", res.data.key);
            this.$router.push("/");
          }
        })
        .catch((err) => console.log(err.response.data));
    },
    login({ commit, getters }, loginData) {
      console.log(loginData);
      axios({
        method: "post",
        url: SERVER.URL + "/user/login",
        data: {
          email: loginData.loginEmail,
          password: loginData.loginPassword,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.status) {
            commit("SET_TOKEN", { token: res.headers["jwt-auth-token"] });
            commit("SET_EMAIL", { email: res.data.data.email });
            commit("SET_USER", { login_user: res.data.data.uid });
            commit("SET_STATUS", { status: res.data.status });
            getters.config;
            router.push({ name: "MAIN" });
          }
        })
        .catch((e) => {
          console.log(e.response.data);
        });
    },
    sociallogin({ commit }, loginData) {
      commit("SET_AUTHTOKEN", { auth_token: loginData.auth_token });
      const email = loginData.email;
      axios({
        method: "post",
        url: SERVER.URL + "/user/socialsignin",
        data: {
          email,
        },
      })
        .then((res) => {
          if (res.data.status) {
            commit("SET_TOKEN", { token: res.headers["jwt-auth-token"] });
            commit("SET_EMAIL", { email: res.data.data.email });
            commit("SET_USER", { login_user: res.data.data.uid });
            commit("SET_STATUS", { status: res.data.status });
          } else {
            alert("error");
          }
        })
        .catch(function(error) {
          if (error.response) {
            console.log(error.response.data);
          } else {
            console.log(error.request);
          }
        })
        .then(() => {
          router.push({ name: "MAIN" });
        });
    },
    logout({ commit, state }) {
      commit("SET_TOKEN", { token: "" });
      commit("SET_EMAIL", { email: "" });
      commit("SET_USER", { login_user: "" });
      commit("SET_STATUS", { status: "" });
      if (state.auth_token) {
        axios({
          method: "POST",
          url:
            "https://cors-anywhere.herokuapp.com/https://kapi.kakao.com/v1/user/logout",
          headers: {
            Authorization: "Bearer " + state.auth_token,
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        })
          .then(() => {
            commit("SET_AUTHTOKEN", { auth_token: "" });
          })
          .catch(function(error) {
            if (error.response) {
              console.log(error.response.data);
            } else {
              console.log(error.request);
            }
          })
          .then(() => {
            storagesession.clear();
            storagelocal.clear();
          })
          .then(() => {
            router.push({ name: "MAIN" });
          });
      }
    },
    getBoardLists({
      state
    }) {
      axios({
        method: "get",
        url: SERVER.URL + "/feature/board/list"
      })
        .then((res) => {
          if (res.data) {
            console.log(res.data)
            state.board_lists = res.data
          }
        })
        .catch((error)=> {
          if (error.response) {
            console.log(error.response.data);
          } else {
            console.log(error.request);
          }
        })
    },
  },
});