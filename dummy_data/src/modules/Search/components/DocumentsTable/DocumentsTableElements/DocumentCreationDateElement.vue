<template>
  <documents-table-element label="Date de création" width="25%">
    <template #item="{ props }">
      <document-creation-date-item
        :creation-date="isTrash ? props.deleted : props.updatedDate"
      />
    </template>
    <template #header>
      <document-creation-date-header :value="title" />
    </template>
  </documents-table-element>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DocumentCreationDateHeader from '@/modules/Search/components/DocumentsTable/DocumentsTableHeaders/DocumentCreationDateHeader.vue'
import DocumentCreationDateItem from '@/modules/Search/components/DocumentsTable/DocumentsTableItems/DocumentCreationDateItem.vue'
import DocumentsTableElement from '@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentsTableElement.vue'
import { useTranslation } from '@/Common/hooks/useTranslation'

export default defineComponent({
  name: 'DocumentCreationDateElement',
  props: {
    value: { type: String },
    isTrash: {
      type: Boolean,
      default: false
    }
  },
  components: {
    DocumentsTableElement,
    DocumentCreationDateItem,
    DocumentCreationDateHeader
  },
  setup(props) {
    const { tc } = useTranslation()

    return {
      title: props.value ?? tc('ged.common.table.headers.date')
    }
  }
})
</script>
