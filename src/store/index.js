import { createStore } from "vuex";

export default createStore({
  state: {
    showModal: true,
    players: [
      {
        name: "Mathias",
        score: [
          "30",
        ],
      },
      {
        name: "Tenna",
        score: [
          "30",
        ],
      },
    ],
    dice: [
      {
        num: 1,
        frozen: true,
      },
      {
        num: 2,
        frozen: true,
      },
      {
        num: 3,
        frozen: true,
      },
      {
        num: 4,
        frozen: true,
      },
      {
        num: 5,
        frozen: true,
      },
      {
        num: 6,
        frozen: true,
      },
    ]
  },
  getters: {
    getShowModal: state => state.showModal,
    getPlayers: state => state.players,
    getDice: state => state.dice,
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
    SET_DICE(state, {index, value}) {
      state.dice[index].num = value
    },
    FREEZE_DICE(state, index) {
      if (state.dice[index].frozen) {
        state.dice[index].frozen = false
      } else {
        state.dice[index].frozen = true
      }
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
    },
    setRandomDiceData({ commit }, index) {
      const value = Math.floor(Math.random() * 6) + 1;
      console.log(index, value);
      commit("SET_DICE", { index, value })
    },
    setDice({ dispatch }, index) {
      let count = 0;
      const timer = setInterval(() => {
        dispatch("setRandomDiceData", index)
        if (count >= 6) {
          clearInterval(timer);
        }
        count += 1;
      }, 150);
    }
  }
})