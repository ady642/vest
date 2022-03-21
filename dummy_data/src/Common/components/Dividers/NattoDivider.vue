<template>
  <span class="natto-divider" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NattoDivider'
})
</script>

<style lang="scss" scoped>
.natto-divider {
  width: 1px;
  background-color: var(--grey-300);
}
</style>
