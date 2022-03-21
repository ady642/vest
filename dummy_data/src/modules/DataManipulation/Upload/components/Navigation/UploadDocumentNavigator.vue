<template>
  <natto-folders-browser
    :folders="browserFolders"
    :height="height"
    :disabled="disabled"
    @browser-folder-selected="browse"
  >
    <template #actions>
      <natto-icon element-name="arrow-right" />
    </template>
  </natto-folders-browser>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import NattoFoldersBrowser from '@/Common/components/Navigation/NattoFoldersBrowser.vue'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import NattoIcon from '@/Common/components/Icons/NattoIcon.vue'

export default defineComponent({
  name: 'UploadDocumentNavigator',
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
    disabled: { type: Boolean, default: false }
  },
  components: {
    NattoIcon,
    NattoFoldersBrowser
  },
  emits: ['update:searchFolderId'],

  setup(props, { emit }) {
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

    return {
      browse,
      browserFolders
    }
  }
})
</script>
