<template>
  <preview-cta-container :tooltip-content="$t('ged.common.close')">
    <MpIcon name="close" />
  </preview-cta-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PreviewCTAContainer from '@/modules/Search/components/Modals/PreviewModal/PreviewModalHeader/CTAs/PreviewCTAContainer.vue'

export default defineComponent({
  name: 'CrossClose',
  components: {
    'preview-cta-container': PreviewCTAContainer
  }
})
</script>
