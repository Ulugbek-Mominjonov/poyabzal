import EventService from '@/services/EventServices.js'

import axios from "axios";
export const namespaced = true;

export const state = {
  authData: {
    token: "",
    refreshToken: "",
  },
  isHave: null
};
export const mutations = {
  saveTokenData(state, data) {
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    const newTokenData = {
      token: data.access,
      refreshToken: data.refresh,
    };

    state.authData = newTokenData;
  },
  IS_HAVE(state, payload) {
    state.isHave = payload.created
  },
  clear_data(state) {
    state.authData.token = "";
    state.authData.refresh = "";
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },
  SET_KABINET(payload) {
    console.log(payload);
  }
};
export const actions = {
  async login({ commit }, payload) {
    await axios
      .post("http://89.223.122.69:8004/api/auth/token/", payload)
      .then((response) => {
        commit("saveTokenData", response.data);
      });
  },

  getSms({commit}, nomer) {
    axios
      .post("http://89.223.122.69:8004/api/auth/sms/", nomer)
        .then(res => {
          commit('IS_HAVE', res.data)
        })
  },
  setKabinet({commit}, data) {
    EventService.putKabinet(data).then(res => {
      commit('SET_KABINET', res.data)
    })
  }
};
export const getters = {
  getAuthData(state) {
    return state.authData;
  },
};
