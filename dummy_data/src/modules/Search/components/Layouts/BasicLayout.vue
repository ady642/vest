<template>
  <div class="basic-layout">
    <div class="basic-layout__header">
      <slot name="header"></slot>
    </div>
    <div class="basic-layout__content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BasicLayout'
})
</script>

<style lang="scss" scoped>
.basic-layout {
  padding: 40px;
  display: flex;
  flex-direction: column;
  row-gap: 5px;

  &__header {
    flex-basis: 20%;
  }

  &__content {
    flex-basis: 80%;
  }
}
</style>
