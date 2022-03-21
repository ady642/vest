<template>
  <div class="preview-modal__ctas">
    <download-cta :is-downloading="isDownloading" @click="$emit('download')" />
    <delete-cta
      :is-document-deletable="isDocumentDeletable"
      :is-document-deleting="isDocumentDeleting"
      @click="$emit('delete')"
    />
    <cross-close @click="$emit('close-click')" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CrossClose from '@/modules/Search/components/Modals/PreviewModal/PreviewModalHeader/CTAs/CrossClose.vue'
import DownloadCTA from '@/modules/Search/components/Modals/PreviewModal/PreviewModalHeader/CTAs/DownloadCTA.vue'
import DeleteCTA from '@/modules/Search/components/Modals/PreviewModal/PreviewModalHeader/CTAs/DeleteCTA.vue'

export default defineComponent({
  name: 'PreviewModalCTAs',
  components: {
    'delete-cta': DeleteCTA,
    'download-cta': DownloadCTA,
    CrossClose
  },
  props: {
    isDocumentDeletable: Boolean,
    isDocumentDeleting: Boolean,
    isDownloading: Boolean
  }
})
</script>

<style lang="scss" scoped>
.preview-modal__ctas {
  display: flex;
  column-gap: 40px;
}
</style>
