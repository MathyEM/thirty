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
        frozen: false,
      },
      {
        num: 2,
        frozen: false,
      },
      {
        num: 3,
        frozen: false,
      },
      {
        num: 4,
        frozen: false,
      },
      {
        num: 5,
        frozen: false,
      },
      {
        num: 6,
        frozen: false,
      },
    ],
    disableDice: true,
  },
  getters: {
    getShowModal: state => state.showModal,
    getPlayers: state => state.players,
    getDice: state => state.dice,
    getDiceSum: state => {
      let sum = 0
      for (let i = 0; i < state.dice.length; i++) {
        const num = state.dice[i].num;
        if (state.dice[i].frozen) {
          sum = sum+num
        }
      }
      return sum
    }
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
      if (state.disableDice) {
        return
      }
      if (state.dice[index].frozen) {
        state.dice[index].frozen = false
      } else {
        state.dice[index].frozen = true
      }
    },
    ENABLE_DICE(state) {
      state.disableDice = false
    }
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
      }, 100);
    },
    rollDice({ dispatch, commit, getters }) {
      for (let i = 0; i < 6; i++) {
        if (getters.getDice[i].frozen) {
          continue;
        }
        dispatch("setDice", i)
      }
      commit('ENABLE_DICE')
    }
  }
})