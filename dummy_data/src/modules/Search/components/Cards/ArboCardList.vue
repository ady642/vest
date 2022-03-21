<template>
  <div class="arbo-card__list">
    <arbo-card
      v-for="folder in folders.collection"
      :key="folder.id"
      :root-folder="folder"
      @explore-more-clicked="goToArboView({ folderId: folder.id })"
      @shortcut-clicked="goToArboView({ folderId: $event })"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ArboCard from '@/modules/Search/components/Cards/ArboCard.vue'
import { useStore } from 'vuex'
import useSearchStoreHelpers from '@/modules/Search/store/helpers'
import useSearchNavigator from '@/modules/Search/navigator/useSearchNavigator'

export default defineComponent({
  name: 'ArboCardList',
  components: { ArboCard },

  setup() {
    const store = useStore()

    const { folders } = useSearchStoreHelpers()

    const { goToArboView } = useSearchNavigator()

    return {
      folders: folders(store),
      goToArboView
    }
  }
})
</script>
