<template>
  <documents-table-element :width="100">
    <template #item="{ props }">
      <trash-document-origin-item :origin="props.deletedBy" />
    </template>
    <template #header>
      <documents-table-header>
        <span>Origine</span>
      </documents-table-header>
    </template>
  </documents-table-element>
</template>

<script>
import { defineComponent } from 'vue'
import DocumentsTableElement from '@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentsTableElement'
import TrashDocumentOriginItem from '@/modules/Trash/components/TrashDocumentTableItems/TrashDocumentTableOriginItem.vue'
import DocumentsTableHeader from '@/modules/Search/components/DocumentsTable/DocumentsTableHeaders/DocumentsTableHeader.vue'

export default defineComponent({
  name: 'TrashDocumentOrigin',
  components: {
    DocumentsTableElement,
    TrashDocumentOriginItem,
    DocumentsTableHeader
  }
})
</script>
