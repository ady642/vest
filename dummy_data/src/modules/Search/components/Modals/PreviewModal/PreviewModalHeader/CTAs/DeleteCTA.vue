<template>
  <preview-cta-container :tooltip-content="tooltipContent">
    <loading-icon v-if="isDocumentDeleting" />
    <MpIcon v-else name="delete" />
  </preview-cta-container>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import PreviewCTAContainer from '@/modules/Search/components/Modals/PreviewModal/PreviewModalHeader/CTAs/PreviewCTAContainer.vue'
import { useTranslation } from '@/Common/hooks/useTranslation'
import LoadingIcon from '@/Common/components/Icons/LoadingIcon.vue'

export default defineComponent({
  name: 'DeleteCTA',
  components: {
    LoadingIcon,
    'preview-cta-container': PreviewCTAContainer
  },
  props: {
    isDocumentDeletable: Boolean,
    isDocumentDeleting: Boolean
  },
  setup(props) {
    const { t } = useTranslation()

    const tooltipContent = computed(() =>
      props.isDocumentDeletable
        ? t('ged.dataManipulation.delete.file')
        : t('ged.dataManipulation.delete.cantDelete')
    )

    return {
      tooltipContent
    }
  }
})
</script>
