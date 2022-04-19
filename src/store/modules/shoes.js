import EventService from '@/services/EventServices.js'

export const namespaced = true;

export const state = {
  category: [],
  pList: [],
  catId: 0,
  productDetail: {},
  sale: 0,
  data: {},
  tip: null
};
export const mutations = {
  SET_CAT(state, payload) {
    state.category = payload
  },
  SET_LIST(state, payload) {
    state.pList = payload
  },
  SET_CAT_ID(state, payload) {
    state.catId = payload
  },
  SET_DETAIL(state, payload) {
    state.productDetail = payload
  },
  IS_SALE(state, value) {
    state.sale = value
  },
  SET_DATA(state, data) {
    state.data = data
    console.log(data);
  },
  SET_TIP(state, value) {
    state.tip = value
  }
};
export const actions = {
  getCategory({commit}) {
    EventService.getCat()
      .then(res => {
        commit("SET_CAT", res.data)
      })
  },
  proCat({commit}, value) {
    EventService.getProCat(value)
      .then(res => {
        commit("SET_LIST", res.data)
      })
  },
  proDetail({commit}, id) {
    EventService.getDetail(id)
      .then(res => {
        commit('SET_DETAIL', res.data)
      })
  },
  filter({commit}, payload) {
    EventService.getFilter(payload)
      .then(res => {
        commit("SET_LIST", res.data)
      })
  }
};
export const getters = {

};
