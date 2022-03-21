<template>
  <natto-table-header>
    <slot />
  </natto-table-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NattoTableHeader from '@/Common/components/Table/NattoTableHeader.vue'

export default defineComponent({
  name: 'DocumentsTableHeader',
  components: { NattoTableHeader }
})
</script>
