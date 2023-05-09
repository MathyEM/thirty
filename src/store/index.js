import { createStore } from "vuex";

export default createStore({
  state: {
    showModal: false,
  },
  getters: {
    getShowModal: state => state.showModal,
  },
  mutations: {
    TOGGLE_SHOW_MODAL(state) {
      if (state.showModal == true) {
        state.showModal = false
      } else {
        state.showModal = true
      }
    },
  },
  actions: {
    ToggleShowModal({ commit }) {
      commit('TOGGLE_SHOW_MODAL')
      console.log("test");
    },
  }
})