<template>
  <documents-table-header>
    <div class="document-creation-date__header">
      <span class="document-creation-date__header--text">{{ value }}</span>
    </div>
  </documents-table-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DocumentsTableHeader from '@/modules/Search/components/DocumentsTable/DocumentsTableHeaders/DocumentsTableHeader.vue'

export default defineComponent({
  name: 'DocumentCreationDateHeader',
  props: {
    value: { type: String, default: "Date d'ajout" }
  },
  components: {
    DocumentsTableHeader
  }
})
</script>

<style lang="scss" scoped>
.document-creation-date__header {
  display: flex;
  align-items: center;

  &--text {
    margin-right: 5px;
  }
}
</style>
