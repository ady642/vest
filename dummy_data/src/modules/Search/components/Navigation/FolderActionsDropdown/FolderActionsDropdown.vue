<template>
  <natto-dropdown>
    <template #activator>
      <folder-actions-dropdown-activator />
    </template>
    <template #list>
      <folder-actions-dropdown-list
        :folder-id="folder.id"
        @item-clicked="handleAction"
      />
    </template>
  </natto-dropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import NattoDropdown from '@/Common/components/Dropdown/NattoDropdown.vue'

import FolderActionsDropdownActivator from '@/modules/Search/components/Navigation/FolderActionsDropdown/FolderActionsDropdownActivator.vue'
import FolderActionsDropdownList from '@/modules/Search/components/Navigation/FolderActionsDropdown/FolderActionsDropdownList/FolderActionsDropdownList.vue'
import Folder from '@/modules/Search/models/Folders/Inputs/Folder'
import { ITEMS } from '@/Common/types/actionItemTypes'

export default defineComponent({
  name: 'FolderActionsDropdown',

  components: {
    FolderActionsDropdownList,
    FolderActionsDropdownActivator,
    NattoDropdown
  },

  props: {
    folder: {
      type: Folder,
      required: true
    }
  },

  setup(props, { emit }) {
    const handleAction = (action: keyof ITEMS) => {
      emit(`${action}-clicked`, props.folder)
    }

    return {
      handleAction
    }
  }
})
</script>
