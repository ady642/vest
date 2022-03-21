<template>
  <documents-table-element label="Actions" :width="100">
    <template #item="{ props }">
      <document-sync-status-item :document="props" />
    </template>
    <template #header> </template>
  </documents-table-element>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DocumentSyncStatusItem from '@/modules/Search/components/DocumentsTable/DocumentsTableItems/DocumentSyncStatusItem.vue'
import DocumentsTableElement from '@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentsTableElement.vue'

export default defineComponent({
  name: 'DocumentSyncStatusElement',
  components: {
    DocumentsTableElement,
    DocumentSyncStatusItem
  }
})
</script>
