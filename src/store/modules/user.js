import EventService from '@/services/EventServices.js'

export const namespaced = true;

export const state = {
  user: ""
};
export const mutations = {
  SET_USER(state, payload) {
    state.user = payload
  }
};
export const actions = {
  UserData({commit}) {
    EventService.getUserData()
      .then(res => {
        commit("SET_USER", res.data)
      })
  }
};
export const getters = {

};
