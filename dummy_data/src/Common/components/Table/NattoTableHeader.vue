<template>
  <div class="natto-table__header"><slot /></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NattoTableHeader'
})
</script>

<style lang="scss" scoped>
.natto-table__header {
  color: #c0c4cc;
  transition: all ease-in-out 0.3s;

  &:hover {
    color: #3c3c3b;
  }

  &:focus {
    color: #3c3c3b;
  }
}
</style>
