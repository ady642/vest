<template>
  <div
    class="natto-primary-cta"
    @click="onClick"
    :class="disabled ? 'disabled-btn' : ''"
  >
    <span class="btn-text">{{ btnText }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
export default defineComponent({
  name: 'NattoPrimaryCta',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    action: {
      type: String,
      default: 'validateNext'
    }
  },

  emits: ['validate', 'close'],
  setup(props, { emit }) {
    return {
      btnText: computed(() => {
        switch (props.action) {
          case 'validateNext':
            return 'Valider et suivant'
          case 'validate':
            return 'Valider'
          case 'finish':
            return 'Fermer'
          default:
            return ''
        }
      }),
      onClick() {
        if (!props.disabled) {
          switch (props.action) {
            case 'validateNext':
              emit('validate')
              break
            case 'validate':
              emit('validate')
              break
            case 'finish':
              emit('close')
              break
          }
        }
      }
    }
  }
})
</script>

<style lang="scss">
.natto-primary-cta {
  width: 150px;
  height: 44px;
  background: #4e50f5;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  .btn-text {
    font-size: 14px;
    font-weight: 600;
    line-height: 21px;
    letter-spacing: 0;
    color: white;
  }
}

.disabled-btn {
  background-color: #c0c4cc;
  border-color: #c0c4cc;
}
</style>
