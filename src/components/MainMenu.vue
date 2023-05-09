<template>
  <div class="main-menu">
    <h1>Header text</h1>
    <button>Start et spil</button>
    <ModalBox :show="getShowModal"/>
  </div>
</template>

<script>
import ModalBox from "@/components/subcomponents/ModalBox.vue";
import { mapGetters } from 'vuex'

export default {
  name: 'MainMenu',
  components: {
    ModalBox,
  },
  props: {

  },
  data() {
    return {
      showModal: true,
    }
  },
  computed: {
    ...mapGetters([
      'getShowModal',
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
