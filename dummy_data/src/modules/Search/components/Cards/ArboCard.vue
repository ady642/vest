<template>
  <natto-card class="arbo-card">
    <div class="arbo-card-container">
      <div class="arbo-card-header">
        <arbo-card-title :title="rootFolder.name" />
      </div>
      <div class="arbo-card-content two-rows">
        <div class="arbo-description">
          <arbo-description
            :description="rootFolder.properties?.folderDescription"
          />
        </div>
        <div class="arbo-shortcuts">
          <folder-shortcut-list
            :folderShortcuts="shortcutFolders"
            @folder-shortcut-click="handleShortcutClick"
            @explore-more-clicked="handleExploreClick"
          />
        </div>
      </div>
    </div>
  </natto-card>
</template>

<script lang="ts">
import FolderShortcutList from '@/modules/Search/components/Cards/FolderShortcutList.vue'
import Folder from '@/modules/Search/models/Folders/Inputs/Folder'
import { defineComponent, computed } from 'vue'
import useSearchStoreHelpers from '@/modules/Search/store/helpers'
import { useStore } from 'vuex'
import ArboDescription from '@/modules/Search/components/Cards/ArboDescription.vue'
import ArboCardTitle from '@/modules/Search/components/Cards/ArboCardTitle.vue'
import NattoCard from '@/Common/components/Cards/NattoCard.vue'
import { trackEventFactory } from '@/Common/helpers/analyticsLog'
import analyticsCode from '@/Common/constants/analyticsCode'

export default defineComponent({
  name: 'ArboCard',

  components: {
    NattoCard,
    ArboCardTitle,
    ArboDescription,
    FolderShortcutList
  },

  props: {
    rootFolder: {
      type: Folder,
      required: true
    }
  },

  emits: ['explore-more-clicked', 'shortcut-clicked'],

  setup(props, { emit }) {
    const store = useStore()

    const { folders } = useSearchStoreHelpers()

    const shortcutFolders = computed(() =>
      folders(store).value.getShortcutsFolder(props.rootFolder?.id ?? 0)
    )

    return {
      handleExploreClick() {
        if (props.rootFolder.properties?.tracingName) {
          trackEventFactory(
            analyticsCode['mdv-cta-arbo-card-explore-click'],
            props.rootFolder.properties.tracingName
          )
        }
        emit('explore-more-clicked')
      },
      handleShortcutClick({
        shortcutFolder,
        shortcutIndex
      }: {
        shortcutFolder: Folder
        shortcutIndex: number
      }) {
        if (
          props.rootFolder.properties?.tracingName &&
          shortcutFolder.properties?.tracingName
        ) {
          trackEventFactory(
            analyticsCode['mdv-cta-arbo-card-shortcut-click'],
            props.rootFolder.properties.tracingName,
            shortcutIndex + 1, // Index start at 0
            shortcutFolder.properties.tracingName
          )
        }
        emit('shortcut-clicked', shortcutFolder.id)
      },
      shortcutFolders
    }
  }
})
</script>

<style lang="scss">
.arbo-card {
  margin-bottom: 24px;

  .two-rows {
    grid-template-rows: 1fr 1fr;
    margin-bottom: 0;

    .arbo-shortcuts {
      display: flex;
      justify-content: flex-end;
      margin-top: 1vh;
    }
  }

  .arbo-card-container {
    .arbo-card-content {
      display: grid;
      grid-template-rows: 1fr;
      grid-template-columns: 1fr 2fr;
      grid-gap: 24px;
      margin-bottom: 24px;
    }

    .arbo-card-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
}
</style>
