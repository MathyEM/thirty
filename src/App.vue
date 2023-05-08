<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <ScoreTracking msg="Welcome to Your Vue.js App"/>
</template>

<script>
import ScoreTracking from './components/ScoreTracking.vue'

export default {
  name: 'App',
  components: {
    ScoreTracking
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
