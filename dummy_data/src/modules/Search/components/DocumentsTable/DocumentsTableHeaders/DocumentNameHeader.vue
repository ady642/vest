<template>
  <documents-table-header>
    <span>{{ value }}</span>
  </documents-table-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DocumentsTableHeader from '@/modules/Search/components/DocumentsTable/DocumentsTableHeaders/DocumentsTableHeader.vue'

export default defineComponent({
  name: 'DocumentNameHeader',
  components: { DocumentsTableHeader },
  props: {
    value: {
      type: String,
      default: 'Nom de vos documents'
    }
  }
})
</script>
