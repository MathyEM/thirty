import { createStore } from "vuex";

export default createStore({
  state: {
    showModal: true,
    players: [
      {
        name: "Mathias",
        score: 30,
        activeTurn: true,
      },
      {
        name: "Tenna",
        score: 30,
        activeTurn: false,
      },
    ],
    freezeQuotaMet: true,
    isRollingAttack: false,
    attackDiceTarget: null,
    dice: [
      {
        num: 1,
        frozen: false,
        locked: false,
      },
      {
        num: 2,
        frozen: false,
        locked: false,
      },
      {
        num: 3,
        frozen: false,
        locked: false,
      },
      {
        num: 4,
        frozen: false,
        locked: false,
      },
      {
        num: 5,
        frozen: false,
        locked: false,
      },
      {
        num: 6,
        frozen: false,
        locked: false,
      },
    ],
    //
    // REQUIRE AT LEAST ONE DICE FREEZE PER ROUND
    //
    disableDice: true,
  },
  getters: {
    getShowModal: state => state.showModal,
    getPlayers: state => state.players,
    getFreezeQuotaMet: state => state.freezeQuotaMet,
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
    },
    getFrozenDiceCount: state => {
      let count = 0;
      for (let i = 0; i < state.dice.length; i++) {
        const dice = state.dice[i];
        if (dice.frozen) {
          count++
        }
      }
      return count
    },
    getIsRollingAttack: state => {
      return state.isRollingAttack
    },
    getAttackDiceTarget: state => {
      return state.attackDiceTarget
    },
    getActivePlayerIndex: state => {
      return state.players.findIndex( player => player.activeTurn == true)
    },
    getInactivePlayerIndex: state => {
      return state.players.findIndex( player => player.activeTurn == false)
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
    UPDATE_ACTIVE_PLAYER(state, { disableIndex, enableIndex }) {
      state.players[disableIndex].activeTurn = false
      state.players[enableIndex].activeTurn = true
    },
    SET_DICE(state, {index, value}) {
      state.dice[index].num = value
    },
    TOGGLE_FREEZE_DICE(state, index) { // freezeQuotaMet handled here
      if ((state.disableDice || state.dice[index].locked) && !state.isRollingAttack) {
        console.log("not rolling attack");
        return
      }
      if (state.dice[index].frozen) {
        state.dice[index].frozen = false
        state.freezeQuotaMet = true
      } else {
        state.dice[index].frozen = true
        state.freezeQuotaMet = true
      }
    },
    UNFREEZE_DICE(state, index) {
      state.dice[index].frozen = false
    },
    FREEZE_QUOTA_MET(state, value) {
      state.freezeQuotaMet = value
    },
    UNLOCK_DICE(state, index) {
      state.dice[index].locked = false
    },
    ENABLE_DICE(state) {
      state.disableDice = false
    },
    DISABLE_DICE(state) {
      state.disableDice = true
    },
    SET_IS_ROLLING_ATTACK(state, value) {
      state.isRollingAttack = value
    },
    SET_ATTACK_DICE_TARGET(state, value) {
      state.attackDiceTarget = value
    },
    REDUCE_HEALTH(state, {index, value}) {
      state.players[index].score = state.players[index].score + value
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
      if (getters.getFrozenDiceCount != 6) {
        commit("FREEZE_QUOTA_MET", false)
      }
      for (let i = 0; i < 6; i++) {
        if (getters.getDice[i].frozen) {
          getters.getDice[i].locked = true
          continue;
        }
        dispatch("setDice", i)
      }
      commit('ENABLE_DICE')
    },
    freezeDice({ commit, getters }, index) {
      if (!getters.getIsRollingAttack) {
        return commit('TOGGLE_FREEZE_DICE', index)
      }
      if (getters.getDice[index].num != getters.getAttackDiceTarget) {
        return
      }
      return commit('TOGGLE_FREEZE_DICE', index)
    },
    unfreezeAllDice({ getters, commit }) {
      for (let i = 0; i < getters.getDice.length; i++) {
        commit('UNFREEZE_DICE', i)
      }
    },
    unlockAllDice({ getters, commit }) {
      for (let i = 0; i < getters.getDice.length; i++) {
        commit('UNLOCK_DICE', i)
      }
    },
    resetAllDice({ commit, dispatch }) {
      for (let i = 0; i < this.getters.getDice.length; i++) {
        commit('SET_DICE', { index: i, value: i+1 })
      }
      dispatch("unlockAllDice")
      dispatch("unfreezeAllDice")
      commit("DISABLE_DICE")
      commit("SET_IS_ROLLING_ATTACK", false)
    },
    endTurn({ getters, commit, dispatch }) {
      const disableIndex = getters.getActivePlayerIndex
      const enableIndex = getters.getInactivePlayerIndex

      commit('UPDATE_ACTIVE_PLAYER', { disableIndex, enableIndex })
      dispatch('resetAllDice')
    },
    rollAttackDice({ dispatch, commit, getters }) {
      const attackDiceTarget = getters.getDiceSum-30
      const activePlayerIndex = getters.getActivePlayerIndex
      commit('SET_ATTACK_DICE_TARGET', attackDiceTarget) // find out if the active players takes their own damage or if they get to attack the other player

      if (attackDiceTarget == 0) { // if their sum is 30, the turn just ends
        dispatch('endTurn')
      } else if (attackDiceTarget < 0) { // if the sum is less than 30, the damage themselves
        commit('REDUCE_HEALTH', { index: activePlayerIndex, value: attackDiceTarget })
        dispatch('endTurn')
        commit('SET_ATTACK_DICE_TARGET', null)
      } else { // if their sum is 30+ then let them roll attack
        commit('SET_IS_ROLLING_ATTACK', true)
        dispatch('unfreezeAllDice')
        dispatch('rollDice')
      }
    },
  }
})