<template>
  <div class="score-tracking">
    <h1>Score tracking page</h1>
    <div class="score-sheets-container">
      <ScoreSheet v-for="(player, index) in getPlayers" :key="index" :score="player.score">
        <template v-slot:name>{{ player.name }}</template>
      </ScoreSheet>
    </div>
  </div>
</template>

<script>
import ScoreSheet from "@/components/subcomponents/ScoreSheet.vue";
import { mapGetters } from 'vuex'

export default {
  name: 'ScoreTracking',
  components: {
    ScoreSheet,
  },
  props: {
    msg: String
  },
  computed: {
    ...mapGetters([
      'getPlayers'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.score-sheets-container {
  display: grid;
  grid-template-columns: 1fr 1fr;

  >:first-child {
    border-right: 1px solid black;
  }
}
</style>
