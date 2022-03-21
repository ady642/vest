<template>
  <preview-cta-container :tooltip-content="$t('ged.common.download')">
    <loading-icon v-if="isDownloading" />
    <MpIcon v-else name="download" />
  </preview-cta-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PreviewCTAContainer from '@/modules/Search/components/Modals/PreviewModal/PreviewModalHeader/CTAs/PreviewCTAContainer.vue'
import LoadingIcon from '@/Common/components/Icons/LoadingIcon.vue'

export default defineComponent({
  name: 'DownloadCTA',
  props: {
    isDownloading: Boolean
  },
  components: {
    LoadingIcon,
    'preview-cta-container': PreviewCTAContainer
  }
})
</script>
