<template>
  <div class="home">
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

<style lang="scss" scoped>

</style>
