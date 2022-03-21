<template>
  <natto-dialog-popup
    v-model="isDeleteFolderModalConfirmationOpened"
    :title="title"
    :description="description"
    popup-type="error"
    @confirm-clicked="dispatchDeleteFolder"
    @cancel-clicked="handleCancelClick"
    :loading="isFolderDeleting()"
    :error-message="errorMessage"
  />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import NattoDialogPopup from '@/Common/components/Modals/NattoDialogPopup.vue'
import useVModel from '@/Common/hooks'
import constants from '@/Common/constants'
import useDeleteFolderHelpers from '@/modules/DataManipulation/Delete/DeleteFolder/store/helpers'
import { useStore } from 'vuex'
import { trackEventFactory } from '@/Common/helpers/analyticsLog'
import analyticsCode from '@/Common/constants/analyticsCode'

export default defineComponent({
  name: 'DeleteFolderModalConfirmation',
  components: { NattoDialogPopup },
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    folderId: {
      type: Number,
      required: true
    },
    folderName: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const store = useStore()
    const { deleteFolderByModal, isFolderDeleting } =
      useDeleteFolderHelpers(store)

    const isDeleteFolderModalConfirmationOpened = useVModel(props)
    const errorMessage = ref('')

    const state = {
      title: constants.messages.folders.delete.modal.title,
      description: computed(() =>
        constants.messages.folders.delete.modal.description(props.folderName)
      )
    }

    const dispatchDeleteFolder = async () => {
      try {
        trackEventFactory(analyticsCode['adv-delete-file'])
        await deleteFolderByModal(props.folderId)
        isDeleteFolderModalConfirmationOpened.value = false
      } catch (error) {
        errorMessage.value = constants.messages.folders.delete.error
      }
    }

    const handleCancelClick = () => {
      isDeleteFolderModalConfirmationOpened.value = false
      errorMessage.value = ''
    }

    return {
      isDeleteFolderModalConfirmationOpened,
      title: state.title,
      description: state.description,
      dispatchDeleteFolder,
      handleCancelClick,
      isFolderDeleting,
      errorMessage
    }
  }
})
</script>
