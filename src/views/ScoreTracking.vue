<template>
  <div class="score-tracking">
    <h1>Score tracking page</h1>
    <div class="score-sheets-container">
      <ScoreSheet v-for="(player, index) in getPlayers" :key="index" :score="player.score">
        <template v-slot:name><span class="player-name"><span class="activity-indicator" v-if="player.activeTurn">⦿</span>{{ player.name }}</span></template>
      </ScoreSheet>
    </div>
    <div class="dice-sum">
      <h3>Sum af låste terninger: {{ getDiceSum }}</h3>
      <h4 v-if="getIsRollingAttack">Rul så mange {{ getAttackDiceTarget }}'ere du kan</h4>
    </div>
    <div class="dice-container">
      <Dice v-for="n in 6" :key="n" :diceIndex="n" />
    </div>
    <button v-if="(getFrozenDiceCount == 6 && getDiceSum > 30 && getFreezeQuotaMet) || (getIsRollingAttack && getFreezeQuotaMet && !getAttackRollStalled)" @click="rollAttackDice">Rul angreb</button>
    <button v-else-if="(getFrozenDiceCount == 6 && getDiceSum <= 30) || (getAttackRollStalled && getIsRollingAttack)" @click="endTurn">Afslut runde</button>
    <button v-else-if="(getFreezeQuotaMet && getFrozenDiceCount != 6) || getDisableDice" @click="rollDice">Rul terninger</button>
    <button v-else disabled class="btn-disabled">Lås mindst én terning</button>
  </div>
  <ModalBox :show="getShowGameOverModal && getGameOver" :toggleShow="ToggleShowGameOverModal">
      <template v-slot:header>{{ getPlayers[getOppositePlayerIndex].name }} vandt!</template>
      <template v-slot:body>
        <p>Men vigtigst af alt... {{ getPlayers[getLowestHealthPlayerIndex].name }} tabte</p>
        <div class="inputs">
        </div>
      </template>
      <template v-slot:footer>
        <span></span>
      </template>
    </ModalBox>
</template>

<script>
import ScoreSheet from "@/components/subcomponents/ScoreSheet.vue";
import Dice from "@/components/subcomponents/Dice.vue";
import ModalBox from "@/components/subcomponents/ModalBox.vue";
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ScoreTracking',
  components: {
    ScoreSheet,
    Dice,
    ModalBox,
  },
  props: {
    msg: String
  },
  computed: {
    ...mapGetters([
      'getPlayers',
      'getDiceSum',
      'getFreezeQuotaMet',
      'getFrozenDiceCount',
      'getDisableDice',
      'getAttackRollStalled',
      'getIsRollingAttack',
      'getAttackDiceTarget',
      'getShowGameOverModal',
      'getLowestHealthPlayerIndex',
      'getOppositePlayerIndex',
      'getGameOver',
    ])
  },
  methods: {
    ...mapActions([
      'rollDice',
      'rollAttackDice',
      'endTurn',
      'findOppositePlayerIndex',
      'ToggleShowGameOverModal',
    ]),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.score-sheets-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 1em auto;
  padding: 1em 1em;

  >:first-child {
    border-right: 1px solid black;
  }
}

.activity-indicator {
  position: absolute;
  font-size: 1em;
  color: green;
  padding-right: 0.25em;
  left: 0;
  top: 0;
  transform: translateX(-100%);
}

.player-name {
  padding: 0.1em 0;
  position: relative;
}

.dice-sum {
  margin: 0 auto 2em auto;
}

.dice-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}
</style>
