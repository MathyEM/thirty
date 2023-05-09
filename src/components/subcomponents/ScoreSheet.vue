<template>
  <div class="score-sheet">
    <div class="player-name-wrapper">
      <slot name="name">Insert name here</slot>
    </div>
    <div class="score">
      <div v-for="(scoreLine, index) in score" :key="index" class="score-line">
        {{ scoreLine }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScoreSheet',
  props: {
    score: Array,
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.player-name-wrapper {
  border-bottom: 1px solid black;
}
</style>
