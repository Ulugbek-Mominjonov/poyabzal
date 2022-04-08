import EventService from '@/services/EventServices.js'

export const namespaced = true;

export const state = {
  product: null,
  korzinkaList: []
};
export const mutations = {
  SET_PRODUCT(state, payload) {
    state.product = payload
  },
  SET_LIST(state, payload) {
    state.korzinkaList = payload
  }
};
export const actions = {
  addKorzinka({commit}, id) {
    EventService.addProduct(id)
      .then(res => {
        console.log(res.data);
        commit("SET_PRODUCT", res.data)
      })
  },
  korzinkaList({commit}) {
    EventService.getKorzinkaList()
      .then(res => {
        commit("SET_LIST", res.data)
      })
  }
};
export const getters = {

};
