<template>
  <documents-table-element label="Actions" width="10%">
    <template #item="{ props }">
      <div class="document-actions-container">
        <natto-dropdown>
          <template #activator>
            <document-actions-dropdown-activator
              @click="$emit('document-dropdown-clicked', props.id)"
            />
          </template>
          <template #list>
            <document-actions-dropdown-list
              :document-id="props.id"
              :display-go-to="displayGoTo"
              @item-clicked="handleAction($event, props)"
            />
          </template>
        </natto-dropdown>
      </div>
    </template>
    <template #header>
      <document-action-header />
    </template>
  </documents-table-element>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DocumentActionHeader from '@/modules/Search/components/DocumentsTable/DocumentsTableHeaders/DocumentActionHeader.vue'
import DocumentsTableElement from '@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentsTableElement.vue'
import NattoDropdown from '@/Common/components/Dropdown/NattoDropdown.vue'
import DocumentActionsDropdownActivator from '@/modules/Search/components/DocumentsTable/DocumentsTableItems/DocumentActionsDropdownActivator.vue'
import DocumentActionsDropdownList from '@/modules/Search/components/DocumentsTable/DocumentsTableItems/DocumentActionsDropdownList.vue'
import { ITEMS } from '@/Common/types/actionItemTypes'
import Document from '@/modules/Search/models/Documents/Inputs/Document'

export default defineComponent({
  name: 'DocumentActionsElement',
  components: {
    DocumentsTableElement,
    DocumentActionHeader,
    NattoDropdown,
    DocumentActionsDropdownActivator,
    DocumentActionsDropdownList
  },
  props: {
    displayGoTo: Boolean
  },
  setup(props, { emit }) {
    const handleAction = (action: ITEMS, document: Document) => {
      emit('actions-activator-selected', document.id)
      emit(`${action}-clicked`, {
        documentId: document.id,
        isSynchronizedDocument: document.isSync,
        folderId: document.folderId
      })
    }

    return {
      handleAction
    }
  }
})
</script>

<style lang="scss">
.document-actions-container {
  display: flex;
  justify-content: space-evenly;
  .el-dropdown {
    align-items: center;
    justify-content: center;
    display: flex;
  }
}
</style>
