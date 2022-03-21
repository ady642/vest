<template>
  <documents-table-element width="5%">
    <template #item>
      <document-type-item />
    </template>
    <template #header>
      <document-type-header />
    </template>
  </documents-table-element>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DocumentTypeHeader from '@/modules/Search/components/DocumentsTable/DocumentsTableHeaders/DocumentTypeHeader.vue'
import DocumentTypeItem from '@/modules/Search/components/DocumentsTable/DocumentsTableItems/DocumentTypeItem.vue'
import DocumentsTableElement from '@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentsTableElement.vue'

export default defineComponent({
  name: 'DocumentTypeElement',
  components: {
    DocumentsTableElement,
    DocumentTypeItem,
    DocumentTypeHeader
  }
})
</script>
