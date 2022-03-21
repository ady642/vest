<template>
  <natto-dialog-popup
    v-model="isDeletefileModalConfirmationOpened"
    :title="title"
    :description="description"
    :loading="loading"
    popup-type="error"
    @confirm-clicked="dispatchDeletefile"
    @cancel-clicked="handleCancelClick"
  />
</template>

<script lang="ts">
import { computed, defineComponent, ref, PropType } from 'vue'
import NattoDialogPopup from '@/Common/components/Modals/NattoDialogPopup.vue'
import useVModel from '@/Common/hooks'
import useDeleteFileHelpers from '@/modules/DataManipulation/Delete/DeleteFile/store/helpers'
import useSearchStoreHelpers from '@/modules/Search/store/helpers'
import { useStore } from 'vuex'
import { trackEventFactory } from '@/Common/helpers/analyticsLog'
import analyticsCode from '@/Common/constants/analyticsCode'
import { useTranslation } from '@/Common/hooks/useTranslation'

export default defineComponent({
  name: 'DeleteFileModalConfirmation',
  components: { NattoDialogPopup },
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    documentIds: {
      type: Array as PropType<string[]>,
      required: true
    },
    isSynchronizedDocument: {
      type: Boolean
    }
  },
  emits: ['delete-file-confirmed'],
  setup(props, { emit }) {
    const store = useStore()
    const { deleteFiles } = useDeleteFileHelpers(store)
    const { fetchDocuments } = useSearchStoreHelpers()

    const isDeletefileModalConfirmationOpened = useVModel(props)

    const { tc } = useTranslation()

    const getTranslation = (translationKey: string) =>
      tc(translationKey, props.documentIds.length, {
        fileCount: props.documentIds.length
      })

    const state = {
      title: computed(() =>
        getTranslation('ged.dataManipulation.delete.modal.title')
      ),
      description: computed(() =>
        props.isSynchronizedDocument && props.documentIds.length === 1
          ? getTranslation(
              'ged.dataManipulation.delete.modal.descriptionSyncStatus'
            )
          : getTranslation(
              'ged.dataManipulation.delete.modal.descriptionSimple'
            )
      ),
      loading: ref(false)
    }

    const dispatchDeletefile = async () => {
      trackEventFactory(analyticsCode['adv-delete-file'])
      emit('delete-file-confirmed')
      state.loading.value = true
      await deleteFiles(props.documentIds)
      await fetchDocuments(store)
      isDeletefileModalConfirmationOpened.value = false
      state.loading.value = false
    }

    const handleCancelClick = () => {
      isDeletefileModalConfirmationOpened.value = false
    }

    return {
      loading: state.loading,
      isDeletefileModalConfirmationOpened,
      title: state.title,
      description: state.description,
      dispatchDeletefile,
      handleCancelClick
    }
  }
})
</script>
