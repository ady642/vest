<template>
  <natto-shortcut-card
    prepend-icon="documents"
    :text="folder.properties?.isShortcut"
    @click="handleClick"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Folder from '@/modules/Search/models/Folders/Inputs/Folder'
import NattoShortcutCard from '@/Common/components/Cards/NattoShortcutCard.vue'

export default defineComponent({
  name: 'FolderCard',
  components: { NattoShortcutCard },
  props: {
    folder: {
      type: Folder,
      required: true
    }
  },
  emits: ['folder-click'],
  setup(props, { emit }) {
    const handleClick = () => {
      emit('folder-click')
    }

    return {
      handleClick
    }
  }
})
</script>
