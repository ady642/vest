<template>
  <natto-tabs stretch :items="tabItems">
    <template v-if="isCertified" #download>
      <document-download-tab
        :document="document"
        @download-clicked="$emit('download-clicked')"
      />
    </template>
    <template #details>
      <div>
        <div class="doc-preview">
          <document-details-banner
            :document="document"
            @click="displayPreview"
          />
        </div>

        <div class="doc-details">
          <document-details-tab :document="document" />
        </div>
      </div>
    </template>
  </natto-tabs>
</template>

<script lang="ts">
import NattoTabs from '@/Common/components/Tabs/NattoTabs.vue'
import { defineComponent, computed } from 'vue'
import { useTranslation } from '@/Common/hooks/useTranslation'
import DocumentDetailsTab from '@/modules/Search/components/Drawer/DocumentDetailsTab.vue'
import DocumentDetailsBanner from '@/modules/Search/components/Drawer/DocumentDetailsBanner.vue'
import Document from '@/modules/Search/models/Documents/Inputs/Document'
import DocumentDownloadTab from '@/modules/Search/components/Drawer/DocumentDownloadTab.vue'
export default defineComponent({
  name: 'DocumentDetailsDrawerTabs',
  components: {
    DocumentDownloadTab,
    NattoTabs,
    DocumentDetailsBanner,
    DocumentDetailsTab
  },
  props: {
    document: {
      type: Document,
      required: true
    }
  },
  emits: ['open-preview'],
  setup(props, { emit }) {
    const { tc } = useTranslation()

    const isCertified = computed(
      () => props.document?.properties?.hasSubscribedToVault
    )

    const tabItems = computed(() => {
      let tabItems = []

      tabItems.push({
        id: 'details',
        name: 'details',
        label: tc('ged.search.tabs.label.details')
      })
      if (isCertified.value) {
        tabItems.push({
          id: 'download',
          name: 'download',
          label: tc('ged.search.tabs.label.download')
        })
      }

      return tabItems
    })

    const displayPreview = () => {
      emit('open-preview')
    }

    return {
      tabItems,
      displayPreview,
      isCertified
    }
  }
})
</script>
