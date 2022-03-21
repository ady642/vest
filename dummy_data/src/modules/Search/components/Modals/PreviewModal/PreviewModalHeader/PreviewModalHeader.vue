<template>
  <div class="preview-modal__header">
    <div class="preview-modal__header__name">
      <preview-modal-document-type :type="document.type" />
      <preview-modal-certified-tag
        v-if="document?.properties?.hasSubscribedToVault"
      />
      <span class="preview-modal__header__name__text">{{ document.name }}</span>
    </div>
    <preview-modal-ctas
      :is-document-deletable="isDocumentDeletable"
      :is-document-deleting="isDocumentDeleting"
      :is-downloading="isDownloading"
      @close-click="$emit('close-click')"
      @download="$emit('download')"
      @delete="$emit('delete')"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PreviewModalCTAs from '@/modules/Search/components/Modals/PreviewModal/PreviewModalHeader/CTAs/PreviewModalCTAs.vue'
import PreviewModalDocumentType from '@/modules/Search/components/Modals/PreviewModal/PreviewModalHeader/PreviewModalDocumentType.vue'
import PreviewModalCertifiedTag from '@/modules/Search/components/Modals/PreviewModal/PreviewModalHeader/PreviewModalCertifiedTag.vue'
import Document from '@/modules/Search/models/Documents/Inputs/Document'

export default defineComponent({
  name: 'PreviewModalHeader',
  components: {
    PreviewModalCertifiedTag,
    PreviewModalDocumentType,
    'preview-modal-ctas': PreviewModalCTAs
  },
  props: {
    document: {
      type: Document,
      required: true
    },
    isDocumentDeletable: Boolean,
    isDocumentDeleting: Boolean,
    isDownloading: Boolean
  }
})
</script>

<style lang="scss">
.preview-modal__header {
  color: white;
  font-weight: bold;
  margin-bottom: 64px;
  display: flex;
  align-self: flex-start;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  &__name {
    display: flex;
    align-items: center;
    &__text {
      margin-left: 32px;
    }
  }
}
</style>
