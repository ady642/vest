<template>
  <natto-dialog-popup
    v-model="isRestoreFileModalConfirmationOpened"
    :title="$t('ged.trash.restore.confirmation.title')"
    :description="$t('ged.trash.restore.confirmation.description')"
    popup-type="error"
    @confirm-clicked="handleConfirmClick"
    @cancel-clicked="handleCancelClick"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NattoDialogPopup from '@/Common/components/Modals/NattoDialogPopup.vue'
import useVModel from '@/Common/hooks'

export default defineComponent({
  name: 'RestoreFileModalConfirmation',
  components: { NattoDialogPopup },
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    documentId: {
      type: String,
      required: true
    }
  },
  emits: ['restore-confirm'],
  setup(props, { emit }) {
    const isRestoreFileModalConfirmationOpened = useVModel(props)
    const errorMessage = ref('')

    const handleConfirmClick = () => {
      emit('restore-confirm', props.documentId)
      isRestoreFileModalConfirmationOpened.value = false
    }

    const handleCancelClick = () => {
      isRestoreFileModalConfirmationOpened.value = false
      errorMessage.value = ''
    }

    return {
      isRestoreFileModalConfirmationOpened,
      handleCancelClick,
      errorMessage,
      handleConfirmClick
    }
  }
})
</script>
