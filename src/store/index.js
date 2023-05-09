import { createStore } from "vuex";

export default createStore({
  state: {
    showModal: false,
  },
  getters: {
    getShowModal: state => state.showModal,
  },
  mutations: {

  },
  actions: {

  }
})