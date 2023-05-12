<template>
  <div class="main-menu">
    <h1>Tredive</h1>
    <button @click="ToggleShowModal">Start et spil</button>
    <ModalBox :show="getShowModal" :toggleShow="ToggleShowModal">
      <template v-slot:header>Start et nyt spil</template>
      <template v-slot:body>
        <p>Indtast navnene på de to spillere</p>
        <div class="inputs">
          <div class="input-playername-wrapper">
            <p>Spiller 1</p>
            <input v-on:keyup.enter="$router.push('/score-tracking')" :value="getPlayers[0].name" @input="UpdatePlayerName" type="text" name="spiller1" id="0" class="input-playername">
          </div>
          <div class="input-playername-wrapper">
            <p>Spiller 2</p>
            <input v-on:keyup.enter="$router.push('/score-tracking')" :value="getPlayers[1].name" @input="UpdatePlayerName" type="text" name="spiller2" id="1" class="input-playername">
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <button @click="$router.push('/score-tracking')">Start spil</button>
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
      'getPlayers',
    ]),
  },
  methods: {
    ...mapActions([
      'ToggleShowModal',
      'UpdatePlayerName',
    ]),
    PlayerNameUpdate(e) {
      console.log(e);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;

  p {
    margin: 0.1em;
  }
}
.input-playername-wrapper {
  padding: 1em;
  .input-playername {
    margin: 0.1em;
    width: 100%;
  }
}

</style>
