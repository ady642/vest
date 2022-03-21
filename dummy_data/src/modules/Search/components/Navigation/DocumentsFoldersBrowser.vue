<template>
  <natto-folders-browser
    class="documents-folder-browsers"
    :folders="browserFolders"
    :height="height"
    :disabled="disabled"
    @browser-folder-selected="browse"
  >
    <template #actions="{ folder }">
      <div class="documents-folder-browsers__actions__dropdown">
        <ged-sync-status-icon
          v-if="isCollabUser"
          class="documents-folder-browsers__sync-icon"
          :syncStatus="folder.properties?.syncStatus"
        />
        <folder-actions-dropdown
          :folder="folder"
          @delete-clicked="handleDeleteFolder"
        />
      </div>
    </template>
  </natto-folders-browser>
  <delete-folder-modal-confirmation
    v-model="folderDeleteModalState.isDeleteFolderModalConfirmationOpened"
    :folder-id="folderDeleteModalState.folderToDelete.id ?? 0"
    :folder-name="folderDeleteModalState.folderToDelete?.name ?? ''"
  />
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'
import NattoFoldersBrowser from '@/Common/components/Navigation/NattoFoldersBrowser.vue'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import FolderActionsDropdown from '@/modules/Search/components/Navigation/FolderActionsDropdown/FolderActionsDropdown.vue'
import DeleteFolderModalConfirmation from '@/modules/DataManipulation/Delete/DeleteFolder/components/Modals/DeleteFolderModalConfirmation.vue'
import Folder from '@/modules/Search/models/Folders/Inputs/Folder'
import GedSyncStatusIcon from '@/Common/components/Icons/GedSyncStatusIcon.vue'

export default defineComponent({
  name: 'DocumentsFoldersBrowser',
  props: {
    folders: {
      type: Folders,
      required: true
    },
    searchFolderId: {
      type: Number,
      required: true
    },
    height: Number,
    disabled: { type: Boolean, default: false },
    isCollabUser: {
      type: Boolean,
      default: false
    }
  },
  components: {
    GedSyncStatusIcon,
    DeleteFolderModalConfirmation,
    FolderActionsDropdown,
    NattoFoldersBrowser
  },
  emits: ['update:searchFolderId'],

  setup(props, { emit }) {
    const folderDeleteModalState = reactive({
      isDeleteFolderModalConfirmationOpened: false,
      folderToDelete: {} as Folder
    })

    const browse = (event: Event) => {
      if (props.disabled === false) {
        emit('update:searchFolderId', event)
      }
    }
    const browserFolders = computed(() => {
      if (props.searchFolderId === 0) {
        return props.folders.collection
      }

      return props.folders.getFolderById(props.searchFolderId)?.children
    })

    const handleDeleteFolder = (folder: Folder) => {
      folderDeleteModalState.isDeleteFolderModalConfirmationOpened = true
      folderDeleteModalState.folderToDelete = folder
    }

    return {
      browse,
      browserFolders,
      handleDeleteFolder,
      folderDeleteModalState
    }
  }
})
</script>
