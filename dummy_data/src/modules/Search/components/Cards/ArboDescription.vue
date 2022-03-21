<template>
  <div class="arbo-description">
    <p class="description-text">{{ description }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ArboDescription',
  props: {
    description: { type: String, default: '' }
  }
})
</script>

<style lang="scss">
.arbo-description {
  word-wrap: break-word;
  max-width: 308px;

  .description-text {
    font-size: 14px;
  }
}
</style>
