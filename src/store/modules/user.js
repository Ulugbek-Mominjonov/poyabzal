import EventService from '@/services/EventServices.js'

export const namespaced = true;

export const state = {
  user: {},
  list: [],
  detail: {}
};
export const mutations = {
  SET_USER(state, payload) {
    state.user = payload
  },
  SET_LIST(state, payload) {
    state.list = payload
  },
  SET_DETAIL(state, payload) {
    state.detail = payload
  }
};
export const actions = {
  UserData({commit}) {
    EventService.getUserData()
      .then(res => {
        commit("SET_USER", res.data)
      })
  },
  updateDate({commit}, data) {
    EventService.putUserData(data)
      .then(res => {
        commit("SET_USER", res.data)
      })
  },
  orderList({commit}) {
    EventService.getOrderList()
      .then(res => {
        commit("SET_LIST", res.data)
      })
  },
  orderDetail({ commit }, id) {
    EventService.getOrderDetail(id)
      .then(res => {
        commit("SET_DETAIL", res.data)
      })
  }
};
export const getters = {

};
