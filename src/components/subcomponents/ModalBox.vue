<script>
export default {
  name: "ModalBox",
  props: {
    show: Boolean,
    position: String,
    toggleShow: Function,
    closeButton: {
      type: Boolean,
      default: true,
    }
  },

  methods: {

  }
}
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" :class="position">
          <div class="modal-header">
            <h3>
              <slot name="header">default header</slot>
            </h3>
            <span v-if="closeButton == true" @click="toggleShow" class="close-button">✖</span>
          </div>

          <div class="modal-body">
            <slot name="body">default body</slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              default footer
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9997;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  position: absolute;
  transform: translateX(-50%)translateY(-50%);
  top: 50%;
  left: 50%;
  max-width: 500px;
  width: 90%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: white;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  overflow: auto;

  &.top {
    top: 10%;
  }
  &.bottom {
    transform: translateX(-50%)translateY(0);
    top: initial;
    bottom: 2rem;
  }
}

.modal-header {
  h3 {
    margin-top: 0;
  }
  .close-button {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.2em 0.5em;
    cursor: pointer;
  }
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>