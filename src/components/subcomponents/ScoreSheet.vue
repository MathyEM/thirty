<template>
  <div class="score-sheet">
    <div class="player-name-wrapper">
      <slot name="name">Insert name here</slot>
    </div>
    <div class="score">
      <div class="score-line">
        {{ score }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScoreSheet',
  props: {
    score: Number,
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
  padding: 0.5em 0 0 0;
}

.score {
  padding: 0.5em;

}
</style>
