import { createStore } from "vuex";

export default createStore({
  state: {
    showModal: false,
    showGameOverModal: false,
    players: [
      {
        name: "",
        score: 30,
        activeTurn: true,
      },
      {
        name: "",
        score: 30,
        activeTurn: false,
      },
    ],
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
    disableDice: true,
    gameOver: false,
  },
  getters: {
    getShowModal: state => state.showModal,
    getShowGameOverModal: state => state.showGameOverModal,
    getPlayers: state => state.players,
    getDisableDice: state => state.disableDice,
    getFreezeQuotaMet: (state, getters) => {
      let lockedCount = 0;
      for (let i = 0; i < state.dice.length; i++) {
        const dice = state.dice[i];
        if (dice.locked) {
          lockedCount++
        }
      }
      if (getters.getFrozenDiceCount > lockedCount) {
        return true
      }
      return false
    },
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
    getLockedDiceCount: state => {
      let count = 0;
      for (let i = 0; i < state.dice.length; i++) {
        const dice = state.dice[i];
        if (dice.locked) {
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
    },
    getLowestHealthPlayerIndex: state => {
      return state.players.findIndex( player => player.score <= 0)
    },
    getOppositePlayerIndex (state, getters) {
      const winner = state.players.filter((value, i) => i !== getters.getLowestHealthPlayerIndex )
      const winnerIndex = state.players.findIndex((player) => {
        return player.name == winner[0].name
      })
      
      return winnerIndex
    },
    getAttackRollStalled: (state, getters) => {
      if (!state.attackDiceTarget) {
        return false
      }
      let validDiceCount = 0;
      for (let i = 0; i < state.dice.length; i++) {
        const dice = state.dice[i];
        if (dice.num == state.attackDiceTarget) {
          validDiceCount++
        }
      }
      return ((validDiceCount == 0 && getters.getLockedDiceCount != 0) || (getters.getFrozenDiceCount == getters.getLockedDiceCount))
    },
    getGameOver: state => state.gameOver,
  },
  mutations: {
    TOGGLE_SHOW_MODAL(state) {
      if (state.showModal == true) {
        state.showModal = false
      } else {
        state.showModal = true
      }
    },
    TOGGLE_SHOW_GAME_OVER_MODAL(state) {
      if (state.showGameOverModal == true) {
        state.showGameOverModal = false
      } else {
        state.showGameOverModal = true
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
      if ((state.disableDice || state.dice[index].locked) && !state.isRollingAttack) { //dice aren't disabled or locked, and not currently rolling attack
        console.log("not rolling attack");
        return
      }
      if (state.dice[index].frozen && !state.dice[index].locked) { // if dice is frozen and not locked, then unfreeze it
        state.dice[index].frozen = false
        return
      } 
      if (!state.dice[index].frozen) { // if dice is unfrozen then freeze it
        state.dice[index].frozen = true
      }
    },
    UNFREEZE_DICE(state, index) {
      state.dice[index].frozen = false
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
    UPDATE_GAME_OVER(state, { value }) {
      state.gameOver = value
    },
  },
  actions: {
    ToggleShowModal({ commit }) {
      commit('TOGGLE_SHOW_MODAL')
    },
    ToggleShowGameOverModal({ commit }) {
      commit('TOGGLE_SHOW_GAME_OVER_MODAL')
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
    checkHealth({ getters, commit, dispatch }) {
      if (getters.getLowestHealthPlayerIndex !== -1) {
        commit('UPDATE_GAME_OVER', { value: true })
        dispatch('gameOver')
      }
    },
    ReduceHealth({ commit, getters, dispatch }, { attackDiceTarget }) {
      if ((attackDiceTarget < 0 || getters.getDiceSum != 0) && !getters.getIsRollingAttack) { // if the sum is less than 30, the damage themselves
        commit('REDUCE_HEALTH', { index: getters.getActivePlayerIndex, value: attackDiceTarget })
      } else {
        commit('REDUCE_HEALTH', { index: getters.getInactivePlayerIndex, value: -1 * getters.getDiceSum })
      }
      dispatch('checkHealth')
    },
    endTurn({ getters, commit, dispatch }) {
      const attackDiceTarget = getters.getDiceSum-30

      dispatch('ReduceHealth', { attackDiceTarget })
      commit('UPDATE_ACTIVE_PLAYER', { disableIndex: getters.getActivePlayerIndex, enableIndex: getters.getInactivePlayerIndex })
      commit('SET_ATTACK_DICE_TARGET', null)
      dispatch('resetAllDice')
    },
    rollAttackDice({ dispatch, commit, getters }) {
      if (!getters.getIsRollingAttack) {
        commit('SET_ATTACK_DICE_TARGET', getters.getDiceSum-30) // find out if the active players takes their own damage or if they get to attack the other player
      }

      if (getters.getIsRollingAttack) { 
        dispatch('rollDice')
      } else if (getters.getAttackDiceTarget < 0) { // if the sum is less than 30, the damage themselves
        dispatch('endTurn')
      } else { // if their sum is 30+ then let them roll attack
        dispatch('resetAllDice')
        commit("SET_IS_ROLLING_ATTACK", true)
        dispatch('rollDice')
      }
    },
    gameOver({ commit }) {
      console.log("game over");
      commit('UPDATE_GAME_OVER', { value: true })
      commit('TOGGLE_SHOW_GAME_OVER_MODAL')
    },
  }
})