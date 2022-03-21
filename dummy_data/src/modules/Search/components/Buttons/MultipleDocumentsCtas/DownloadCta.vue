<template>
  <multiple-documents-cta
    :disabled="selectedDocumentsIds.length === 0"
    :text="$t('ged.common.download')"
  >
    <template #prepend-icon>
      <loading-icon size="10" v-if="isMultipleDownloadLoading === true" />
      <download-icon v-else />
    </template>
  </multiple-documents-cta>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import MultipleDocumentsCta from '@/modules/Search/components/Buttons/MultipleDocumentsCtas/MultipleDocumentsCta.vue'
import DownloadIcon from '@/Common/components/Icons/DownloadIcon.vue'
import LoadingIcon from '@/Common/components/Icons/LoadingIcon.vue'
import useSearchStoreHelpers from '@/modules/Search/store/helpers'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'DownloadCta',
  components: { LoadingIcon, DownloadIcon, MultipleDocumentsCta },
  props: {
    selectedDocumentsIds: {
      type: Array as PropType<string[]>,
      required: true
    }
  },
  setup() {
    const store = useStore()
    const { isMultipleDownloadLoading } = useSearchStoreHelpers()

    return {
      isMultipleDownloadLoading: isMultipleDownloadLoading(store)
    }
  }
})
</script>
