<template>
  <div class="score-tracking">
    <h1>Score tracking page</h1>
    <div class="score-sheets-container">
      <ScoreSheet v-for="(player, index) in getPlayers" :key="index" :score="player.score">
        <template v-slot:name>{{ player.name }}</template>
      </ScoreSheet>
    </div>
    <div class="dice-sum">
      <h3>Sum af låste terninger: {{ getDiceSum }}</h3>
    </div>
    <div class="dice-container">
      <Dice v-for="n in 6" :key="n" :diceIndex="n" />
    </div>
    <button @click="rollDice">roll all the dice</button>
  </div>
</template>

<script>
import ScoreSheet from "@/components/subcomponents/ScoreSheet.vue";
import Dice from "@/components/subcomponents/Dice.vue";
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ScoreTracking',
  components: {
    ScoreSheet,
    Dice,
  },
  props: {
    msg: String
  },
  computed: {
    ...mapGetters([
      'getPlayers',
      'getDiceSum'
    ])
  },
  methods: {
    ...mapActions([
      'rollDice',
    ]),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.score-sheets-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 1em auto;
  padding: 1em 1em;

  >:first-child {
    border-right: 1px solid black;
  }
}

.dice-sum {
  margin: 0 auto 2em auto;
}

.dice-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}
</style>
