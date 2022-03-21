<template>
  <natto-drawer v-model:opened="value">
    <template #header>
      <div class="drawer-icon-zone">
        <document-type-tag :type="document.type" />
        <certified-tag-drawer
          v-if="document?.properties?.hasSubscribedToVault"
        />
      </div>
    </template>
    <div class="drawer-content">
      <div class="title">
        <p>{{ $t('ged.drawer.header.title') }}</p>
      </div>
      <div class="doc-content">
        <div class="doc-tabs">
          <document-details-drawer-tabs
            :document="document"
            @open-preview="displayPreview"
            @download-clicked="downloadDocument"
          />
        </div>
      </div>
    </div>
  </natto-drawer>
  <preview-modal
    v-if="isPreviewModalOpened"
    v-model="isPreviewModalOpened"
    :document="document"
    @delete="value = false"
  />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import NattoDrawer from '@/Common/components/Drawer/NattoDrawer.vue'
import Document from '@/modules/Search/models/Documents/Inputs/Document'
import DocumentDetailsDrawerTabs from '@/modules/Search/components/Tabs/DocumentDetailsDrawerTabs.vue'
import PreviewModal from '@/modules/Search/components/Modals/PreviewModal/PreviewModal.vue'
import useVModel from '@/Common/hooks'
import CertifiedTagDrawer from '@/modules/Search/components/Drawer/CertifiedTagDrawer.vue'
import DocumentTypeTag from '@/modules/Search/components/Drawer/DocumentTypeTag/DocumentTypeTag.vue'
import useSearchStoreHelpers from '@/modules/Search/store/helpers'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'DocumentDetailsDrawer',
  components: {
    DocumentTypeTag,
    CertifiedTagDrawer,
    PreviewModal,
    DocumentDetailsDrawerTabs,
    NattoDrawer
  },
  props: {
    opened: Boolean,
    document: {
      type: Document,
      required: true
    }
  },

  setup(props) {
    const store = useStore()

    const isPreviewModalOpened = ref(false)
    const {
      dispatchDownloadDocument,
      downloadVisualization,
      resetVisualization
    } = useSearchStoreHelpers()

    const value = useVModel(props, 'opened')

    const displayPreview = () => {
      isPreviewModalOpened.value = true
    }

    const downloadDocument = async () => {
      await dispatchDownloadDocument(store, props.document.id ?? '')
    }

    watch(
      () => props.document.id,
      async () => {
        await resetVisualization(store)
        if (props.document.id && props.document.type === '.pdf') {
          // Only pdf can have a visualization
          await downloadVisualization(store, props.document.id)
        }
      }
    )

    return {
      displayPreview,
      isPreviewModalOpened,
      value,
      downloadDocument
    }
  }
})
</script>

<style lang="scss">
.drawer-icon-zone {
  display: flex;
  align-items: center;
  column-gap: clamp(20px, 2vw, 28px);
}
.drawer-content {
  padding-left: 24px;
  padding-right: 24px;
  .title {
    padding-top: 25px;
    padding-bottom: 39px;
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    color: var(--grey-900);
    p {
      margin: 0;
    }
  }
  .doc-tabs,
  .doc-preview,
  .doc-details {
    padding-bottom: 24px;
  }
}
</style>
