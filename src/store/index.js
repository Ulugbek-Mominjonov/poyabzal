import Vue from "vue";
import Vuex from "vuex";
import * as auth from "@/store/modules/auth.js";
import * as user from "@/store/modules/user.js";
import * as shoes from "@/store/modules/shoes.js";
import * as korzinka from "@/store/modules/korzinka.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    user,
    shoes,
    korzinka
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {},
});
