<template>
  <documents-table-element width="55%">
    <template #item="{ props }">
      <div class="document-name__item">
        <div>
          <div class="document-name__item__name">
            <document-type-item v-if="!displayDescription" />
            <document-name-item :name="props.name" :search="search" />
          </div>
          <document-path-item v-if="displayDescription" :path="props.path" />
        </div>
        <document-tags
          :has-subscribed-to-vault="props?.properties?.hasSubscribedToVault"
          :is-treated="props.isTreated"
          :is-new="props.isNew"
        />
      </div>
    </template>
    <template #header>
      <document-name-header :value="value" />
    </template>
  </documents-table-element>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DocumentNameItem from '@/modules/Search/components/DocumentsTable/DocumentsTableItems/DocumentNameItem.vue'
import DocumentPathItem from '@/modules/Search/components/DocumentsTable/DocumentsTableItems/DocumentPathItem.vue'
import DocumentNameHeader from '@/modules/Search/components/DocumentsTable/DocumentsTableHeaders/DocumentNameHeader.vue'
import DocumentsTableElement from '@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentsTableElement.vue'
import DocumentTypeItem from '@/modules/Search/components/DocumentsTable/DocumentsTableItems/DocumentTypeItem.vue'
import DocumentTags from '@/modules/Search/components/Tags/DocumentTags.vue'

export default defineComponent({
  name: 'DocumentNameElement',
  components: {
    DocumentTags,
    DocumentTypeItem,
    DocumentsTableElement,
    DocumentNameHeader,
    DocumentNameItem,
    DocumentPathItem
  },
  props: {
    displayDescription: Boolean,
    value: String,
    search: String
  }
})
</script>

<style lang="scss" scoped>
.document-name__item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__name {
    display: flex;
    align-items: center;
  }
}
</style>
