<template>
  <natto-tree
    :data="folders.collection"
    :props="defaultProps"
    @current-change="handleCurrentChange"
  >
    <template #item="{ data }">
      <search-tree-item
        :folder="data"
        :is-folder-selected="data.id === selectedFolder"
        @click="goToArboView({ folderId: data.id })"
      />
    </template>
  </natto-tree>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NattoTree from '@/Common/components/Tree/NattoTree.vue'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import SearchTreeItem from '@/modules/Search/components/Trees/SearchTreeItem.vue'
import Folder from '@/modules/Search/models/Folders/Inputs/Folder'
import useSearchNavigator from '@/modules/Search/navigator/useSearchNavigator'

export default defineComponent({
  name: 'MainViewTree',
  components: { SearchTreeItem, NattoTree },
  props: {
    folders: {
      type: Folders,
      required: true
    }
  },

  setup() {
    const selectedFolder = ref()
    const { goToArboView } = useSearchNavigator()

    return {
      selectedFolder,
      handleCurrentChange: (folder: Folder) => {
        selectedFolder.value = folder.id
      },
      goToArboView,
      defaultProps: {
        label: 'id',
        children: 'children'
      }
    }
  }
})
</script>
