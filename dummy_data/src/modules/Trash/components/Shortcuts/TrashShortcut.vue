<template>
  <natto-shortcut-card
    type="danger"
    class="trash-shortcut"
    :loading="totalLoading"
    :text="
      $tc('ged.documents', trashDocumentsCount, { count: trashDocumentsCount })
    "
    prepend-icon="file"
    @click="handleClick"
  />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue'
import NattoShortcutCard from '@/Common/components/Cards/NattoShortcutCard.vue'
import { useStore } from 'vuex'
import useTrashModule from '@/modules/Trash/store/helpers'
import { trackEventFactory } from '@/Common/helpers/analyticsLog'
import analyticsCode from '@/Common/constants/analyticsCode'
import useTrashNavigator from '@/modules/Trash/navigator/useTrashNavigator'

export default defineComponent({
  name: 'TrashShortcut',
  components: { NattoShortcutCard },

  setup() {
    const store = useStore()

    const { goToTrashView } = useTrashNavigator()

    const handleClick = () => {
      trackEventFactory(analyticsCode['mdv-cta-trash-explore-click'])
      goToTrashView()
    }

    const { documentsTotalCount, fetchTrashDocumentsTotalCount, totalLoading } =
      useTrashModule(store)

    onBeforeMount(async () => {
      await fetchTrashDocumentsTotalCount()
    })

    return {
      trashDocumentsCount: documentsTotalCount(),
      totalLoading: totalLoading(),
      handleClick
    }
  }
})
</script>

<style lang="scss" scoped>
.trash-shortcut {
  flex-basis: 31%;
}
</style>
