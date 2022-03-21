<template>
  <div v-loading="isPreviewLoading" class="preview-container">
    <natto-dialog v-model="isPreviewOpened" :show-close="false">
      <div class="preview-content">
        <preview-modal-header
          :document="document"
          :is-document-deletable="isFileDeletable(document.id)"
          :is-document-deleting="isFileDeleting()"
          :is-downloading="isDownloading"
          @close-click="isPreviewOpened = false"
          @download="downloadDocument"
          @delete="deleteDocument"
        />
        <natto-doc-viewer v-if="isVisualizationPdfType" :file="visualization" />
        <img
          v-else
          :src="previewImage"
          class="preview-content__image"
          alt="preview-image"
        />
      </div>
    </natto-dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Document from '@/modules/Search/models/Documents/Inputs/Document'
import NattoDialog from '@/Common/components/Modals/NattoDialog.vue'
import useVModel from '@/Common/hooks'
import useSearchStoreHelpers from '@/modules/Search/store/helpers'
import { useStore } from 'vuex'
import PreviewModalHeader from '@/modules/Search/components/Modals/PreviewModal/PreviewModalHeader/PreviewModalHeader.vue'
import useDeleteFileHelpers from '@/modules/DataManipulation/Delete/DeleteFile/store/helpers'
import NattoDocViewer from '@/Common/components/DocViewer/NattoDocViewer.vue'

export default defineComponent({
  name: 'PreviewModal',
  components: { NattoDocViewer, PreviewModalHeader, NattoDialog },
  props: {
    document: {
      type: Document,
      required: true
    },
    modelValue: {
      type: Boolean,
      required: true
    }
  },

  setup(props, { emit }) {
    const isPreviewOpened = useVModel(props)
    const store = useStore()

    const {
      getPreviewDocumentImage,
      dispatchDownloadDocument,
      isPreviewLoading,
      fetchDocuments,
      visualization,
      isDownloading
    } = useSearchStoreHelpers()

    const { deleteFile, isFileDeletable, isFileDeleting } =
      useDeleteFileHelpers(store)

    const downloadDocument = async () => {
      await dispatchDownloadDocument(
        store,
        props.document.id ?? '',
        !isVisualizationPdfType.value
      )
    }

    const deleteDocument = async () => {
      if (isFileDeletable(props.document.id ?? '')) {
        await deleteFile(props.document.id ?? '')
        isPreviewOpened.value = false
        emit('delete')
        await fetchDocuments(store)
      }
    }

    const isVisualizationPdfType = computed(
      () => visualization(store).value.type === 'application/pdf'
    )

    return {
      isPreviewLoading: isPreviewLoading(store),
      isDownloading: isDownloading(store),
      isPreviewOpened,
      previewImage: getPreviewDocumentImage(store),
      isFileDeletable,
      deleteDocument,
      downloadDocument,
      isFileDeleting,
      visualization: visualization(store),
      isVisualizationPdfType
    }
  }
})
</script>

<style lang="scss">
.preview {
  &-container {
    .el-overlay {
      background-color: #171717de;
    }
    .el-dialog {
      background: transparent;
      box-shadow: none;
      padding: 48px 105px;
      margin: 0 !important;
      width: auto !important;
      height: 100%;

      &__body {
        padding: 0;
        height: 100%;
      }

      &__header {
        padding: 0;
      }
    }
  }
  &-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;

    &__image {
      border-radius: 2px;
      max-height: 70vh;
    }
  }
}
</style>
