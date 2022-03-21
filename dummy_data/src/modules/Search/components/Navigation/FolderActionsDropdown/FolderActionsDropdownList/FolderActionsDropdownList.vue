<template>
  <section class="folder-actions-dropdown__list">
    <folder-action-dropdown-item
      v-for="{ action, label, icon, disabled } in folderActions"
      :key="action"
      :label="label"
      :icon="icon"
      :disabled="disabled"
      @click="handleClickItem(action)"
    />
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import FolderActionDropdownItem from '@/modules/Search/components/Navigation/FolderActionsDropdown/FolderActionsDropdownList/FolderActionDropdownItem.vue'
import { useStore } from 'vuex'
import useDeleteFolderHelpers from '@/modules/DataManipulation/Delete/DeleteFolder/store/helpers'
import { ITEMS } from '@/Common/types/actionItemTypes'

export default defineComponent({
  name: 'FolderActionsDropdownList',
  components: { FolderActionDropdownItem },
  props: {
    folderId: {
      type: Number,
      required: true
    }
  },

  setup(props, { emit }) {
    const store = useStore()

    const { hasPermissionToDeleteFolder, isFolderDeletable } =
      useDeleteFolderHelpers(store)

    const folderActions = computed(() => [
      {
        action: ITEMS.DELETE,
        label: 'Supprimer',
        icon: 'delete',
        disabled:
          !isFolderDeletable(props.folderId) ||
          !hasPermissionToDeleteFolder(props.folderId)
      }
    ])

    return {
      folderActions,
      handleClickItem: (action: string) => {
        emit('item-clicked', action)
      }
    }
  }
})
</script>
