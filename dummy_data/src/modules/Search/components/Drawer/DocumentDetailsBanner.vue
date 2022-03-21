<template>
  <div
    v-if="previewImage"
    v-loading="isPreviewLoading || isDownloading"
    class="document-details__banner"
  >
    <img
      :src="previewImage"
      class="document-details__banner__image"
      alt="preview-image"
    />
    <div class="overlay">
      <div class="overlay-content">
        <mp-icon name="expand" />
        <span class="label">{{ $t('ged.drawer.preview.expand') }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import { useStore } from 'vuex'
import useSearchStoreHelpers from '@/modules/Search/store/helpers'
import Document from '@/modules/Search/models/Documents/Inputs/Document'

export default defineComponent({
  name: 'DocumentDetailsBanner',

  props: {
    document: {
      type: Document,
      required: true
    }
  },

  setup(props) {
    const store = useStore()

    const {
      downloadPreview,
      getPreviewDocumentImage,
      isPreviewLoading,
      isDownloading
    } = useSearchStoreHelpers()

    watch(
      () => props.document.id,
      async () => {
        if (props.document.id) {
          await downloadPreview(store, props.document.id)
        }
      },
      { immediate: true }
    )

    return {
      isPreviewLoading: isPreviewLoading(store),
      previewImage: getPreviewDocumentImage(store),
      isDownloading: isDownloading(store)
    }
  }
})
</script>

<style lang="scss" scoped>
.document-details__banner {
  padding: 24px 24px 0 24px;
  background-color: var(--background-base);
  max-height: 240px;
  cursor: pointer;
  overflow: hidden;
  border-radius: 12px;
  position: relative;

  &__image {
    box-sizing: border-box;
    object-fit: cover;
    width: 100%;
  }

  .overlay {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
    cursor: pointer;
    transition: all ease-in-out 0.3s;

    &:hover {
      opacity: 1;
    }

    .overlay-content {
      background: var(--white);
      color: var(--primary);
      padding: 8px 12px;
      border-radius: 8px;
      flex-direction: row;
      display: flex;
      justify-content: center;
      align-items: center;

      .label {
        padding-left: 10px;
        font-weight: bold;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}
</style>
