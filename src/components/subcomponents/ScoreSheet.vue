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
.player-name-wrapper, .score {
  border-bottom: 1px solid black;
  padding: 0.2em;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.player-name-wrapper {
  padding: 0;
}
</style>
