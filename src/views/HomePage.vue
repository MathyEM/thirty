<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <MainMenu />
  </div>
</template>

<script>
// @ is an alias to /src
import MainMenu from '@/components/MainMenu.vue'

export default {
  name: 'HomePage',
  components: {
    MainMenu
  }
}
</script>
