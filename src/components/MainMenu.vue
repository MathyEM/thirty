<template>
  <div class="main-menu">
    <h1>Header text</h1>
    <button @click="ToggleShowModal">Start et spil</button>
    <ModalBox :show="getShowModal">
      <template v-slot:header></template>
      <template v-slot:body></template>
      <template v-slot:footer>
        <button>Start spil</button>
      </template>
    </ModalBox>
  </div>
</template>

<script>
import ModalBox from "@/components/subcomponents/ModalBox.vue";
import { mapGetters, mapActions } from 'vuex'

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
    ]),
  },
  methods: {
    ...mapActions([
      'ToggleShowModal',
    ]),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
