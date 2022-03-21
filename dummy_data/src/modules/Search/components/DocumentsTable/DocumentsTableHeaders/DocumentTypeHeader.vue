<template>
  <documents-table-header>
    <div class="document-type__header">
      <dot-icon />
    </div>
  </documents-table-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DotIcon from '@/Common/components/Icons/DotIcon.vue'
import DocumentsTableHeader from '@/modules/Search/components/DocumentsTable/DocumentsTableHeaders/DocumentsTableHeader.vue'

export default defineComponent({
  name: 'DocumentTypeHeader',
  components: { DocumentsTableHeader, DotIcon }
})
</script>

<style lang="scss" scoped>
.document-type__header {
  text-align: center;
}
</style>
