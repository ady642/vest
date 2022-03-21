<template>
  <natto-shortcut-card
    prepend-icon="reader"
    :text="$t('ged.search.arboCard.buttons.exploreMore')"
    type="secondary"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NattoShortcutCard from '@/Common/components/Cards/NattoShortcutCard.vue'

export default defineComponent({
  name: 'ArboExploreButton',
  components: {
    NattoShortcutCard
  }
})
</script>
