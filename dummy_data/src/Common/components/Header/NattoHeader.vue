<template>
  <MpTitle class="natto-header">
    <template #subHeader>
      <slot name="subHeader" />
    </template>
    <template #default>
      <slot name="cta" />
    </template>
  </MpTitle>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'NattoHeader'
})
</script>

<style lang="scss">
.natto-header {
  &.mp-title {
    padding: 0;
  }
}
</style>
