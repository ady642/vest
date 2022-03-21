<template>
  <div class="folder-shortcut-list">
    <folder-card
      v-for="(folder, index) in folderShortcuts"
      :key="folder.id"
      :folder="folder"
      class="folder-item"
      @folder-click="handleFolderClick(folder, index)"
    />
    <div v-if="isPair" class="offset-grid-zone" />
    <arbo-explore-button @click="handleExploreClick" />
  </div>
</template>

<script lang="ts">
import FolderCard from '@/modules/Search/components/Cards/FolderCard.vue'
import Folder from '@/modules/Search/models/Folders/Inputs/Folder'
import { defineComponent, PropType, computed } from 'vue'
import ArboExploreButton from '@/modules/Search/components/Buttons/ArboExploreButton.vue'

export default defineComponent({
  name: 'FolderShortcutList',
  components: { FolderCard, ArboExploreButton },
  props: {
    folderShortcuts: {
      type: Array as PropType<Folder[]>,
      required: true
    }
  },
  emits: ['folder-shortcut-click', 'explore-more-clicked'],
  setup(props, { emit }) {
    const handleFolderClick = (
      shortcutFolder: Folder,
      shortcutIndex: number
    ) => {
      emit('folder-shortcut-click', { shortcutFolder, shortcutIndex })
    }

    return {
      isPair: computed(() => props.folderShortcuts.length % 2 === 0),
      handleExploreClick() {
        emit('explore-more-clicked')
      },
      handleFolderClick
    }
  }
})
</script>

<style lang="scss">
.folder-shortcut-list {
  width: 100%;

  .arbo-explore-button {
    width: 100%;

    .el-icon-view {
      margin-right: 0.8vh;
    }

    .el-icon-arrow-right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }
  }

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 24px;
  grid-row-gap: 24px;
}
</style>
