import { createStore } from "vuex";

export default createStore({
  state: {
    showModal: true,
    players: [
      {
        name: "",
        score: [
          "30",
        ],
      },
      {
        name: "",
        score: [
          "30",
        ],
      },
    ],
  },
  getters: {
    getShowModal: state => state.showModal,
    getPlayers: state => state.players,
  },
  mutations: {
    TOGGLE_SHOW_MODAL(state) {
      if (state.showModal == true) {
        state.showModal = false
      } else {
        state.showModal = true
      }
    },
    UPDATE_PLAYER_NAME(state, {value, index}) {
      state.players[index].name = value
    },
  },
  actions: {
    ToggleShowModal({ commit }) {
      commit('TOGGLE_SHOW_MODAL')
    },
    UpdatePlayerName({ commit }, payload) {
      const index = payload.srcElement.id
      const value = payload.target.value
      commit('UPDATE_PLAYER_NAME', { value, index })
    }
  }
})