<template>
  <div class="document-sync-status__item" v-if="document.properties">
    <natto-button type="text">
      <ged-sync-status-icon :syncStatus="document.properties?.syncStatus" />
    </natto-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NattoButton from '@/Common/components/Buttons/NattoButton.vue'
import GedSyncStatusIcon from '@/Common/components/Icons/GedSyncStatusIcon.vue'
import Document from '@/modules/Search/models/Documents/Inputs/Document'

export default defineComponent({
  name: 'DocumentSyncStatusItem',
  components: { GedSyncStatusIcon, NattoButton },
  props: {
    document: {
      type: Document,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.document-sync-status__item {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
