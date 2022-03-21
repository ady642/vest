<template>
  <multiple-documents-cta
    :disabled="isDeleteCtaDisabled"
    :text="$t('ged.common.delete')"
  >
    <template #prepend-icon>
      <loading-icon v-if="isFileDeleting()" size="10" />
      <delete-icon v-else />
    </template>
  </multiple-documents-cta>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import MultipleDocumentsCta from '@/modules/Search/components/Buttons/MultipleDocumentsCtas/MultipleDocumentsCta.vue'
import DeleteIcon from '@/Common/components/Icons/DeleteIcon.vue'
import { useStore } from 'vuex'
import useDeleteFileHelpers from '@/modules/DataManipulation/Delete/DeleteFile/store/helpers'
import LoadingIcon from '@/Common/components/Icons/LoadingIcon.vue'

export default defineComponent({
  name: 'DeleteCta',
  components: { LoadingIcon, DeleteIcon, MultipleDocumentsCta },
  props: {
    selectedDocumentsIds: {
      type: Array as PropType<string[]>,
      required: true
    }
  },

  setup(props) {
    const store = useStore()
    const { areDocumentsDeletable, isFileDeleting } =
      useDeleteFileHelpers(store)

    const isDeleteCtaDisabled = computed(
      () =>
        isFileDeleting() ||
        props.selectedDocumentsIds.length === 0 ||
        !areDocumentsDeletable(props.selectedDocumentsIds)
    )

    return {
      isDeleteCtaDisabled,
      isFileDeleting
    }
  }
})
</script>
