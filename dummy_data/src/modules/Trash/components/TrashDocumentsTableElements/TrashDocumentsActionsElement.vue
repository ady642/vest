<template>
  <documents-table-element label="Actions" width="4%">
    <template #item="{ props }">
      <div class="document-actions-container">
        <natto-dropdown :disabled="props.restorationStatus === inProgressConst">
          <template #activator>
            <document-actions-dropdown-activator />
          </template>
          <template #list>
            <trash-documents-actions-dropdown-list
              @item-clicked="handleAction"
              :document-id="props.id"
            />
          </template>
        </natto-dropdown>
      </div>
    </template>
    <template #header>
      <!-- <plus-icon-blue /> -->
    </template>
  </documents-table-element>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DocumentsTableElement from '@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentsTableElement.vue'
import NattoDropdown from '@/Common/components/Dropdown/NattoDropdown.vue'
import DocumentActionsDropdownActivator from '@/modules/Search/components/DocumentsTable/DocumentsTableItems/DocumentActionsDropdownActivator.vue'
import { ITEMS } from '@/Common/types/actionItemTypes'
import TrashDocumentsActionsDropdownList from '@/modules/Trash/components/TrashDocumentTableItems/TrashDocumentsActionsDropdownList.vue'
import constants from '@/Common/constants'

export default defineComponent({
  name: 'TrashDocumentsActionsElement',

  components: {
    DocumentsTableElement,
    NattoDropdown,
    DocumentActionsDropdownActivator,
    TrashDocumentsActionsDropdownList
  },

  props: {
    disabled: Boolean
  },

  setup(props, { emit }) {
    const handleAction = (action: keyof ITEMS, documentId: string) => {
      emit(`${action}-clicked`, documentId)
    }

    return {
      handleAction,
      inProgressConst: constants.RESTORE_IN_PROGRESS
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
