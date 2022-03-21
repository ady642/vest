<template>
  <p class="warning-text">
    {{ errorMessage }}
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NattoError',

  props: {
    errorMessage: String
  }
})
</script>

<style lang="scss" scoped>
.warning-text {
  color: var(--danger);
}
</style>
