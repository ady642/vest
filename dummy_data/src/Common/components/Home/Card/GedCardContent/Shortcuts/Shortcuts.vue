<template>
  <div
    v-loading="folders.isLoading"
    element-loading-background="transparent"
    class="shortcuts-container"
    :class="{ loading: folders.isLoading }"
  >
    <shortcut
      v-for="folder in folders.collection"
      :key="folder.id"
      :folder-name="folder.name"
      @click="goToArboView({ folderId: folder.id })"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Shortcut from '@/Common/components/Home/Card/GedCardContent/Shortcuts/Shortcut.vue'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import useSearchNavigator from '@/modules/Search/navigator/useSearchNavigator.ts'

export default defineComponent({
  name: 'Shortcuts',
  components: { Shortcut },
  props: {
    folders: {
      type: Folders,
      required: true
    }
  },

  setup() {
    const { goToArboView } = useSearchNavigator()

    return {
      goToArboView
    }
  }
})
</script>

<style lang="scss" scoped>
.shortcuts-container {
  &.loading {
    min-height: 150px;
  }
}
</style>
