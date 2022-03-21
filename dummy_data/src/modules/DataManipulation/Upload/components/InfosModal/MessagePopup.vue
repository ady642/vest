<template>
  <natto-dialog-popup
    :title="title"
    :description="description"
    :popup-type="popupType"
    :modelValue="isOpened"
    @confirm-clicked="eventHandle('confirm-clicked')"
    @cancel-clicked="eventHandle('cancel-clicked')"
  />
</template>

<script lang="ts">
import NattoDialogPopup from '@/Common/components/Modals/NattoDialogPopup.vue'
import { defineComponent } from 'vue'
import useVModel from '@/Common/hooks'

export default defineComponent({
  name: 'MessagePopup',
  components: {
    NattoDialogPopup
  },
  props: {
    title: {
      type: String
    },
    description: {
      type: String
    },
    popupType: {
      type: String
    }
  },
  emits: ['confirm-clicked', 'cancel-clicked'],
  setup(props, { emit }) {
    const isOpened = useVModel(props)

    const eventHandle = (type: string) => {
      const eventType = type as 'confirm-clicked' | 'cancel-clicked'

      emit(eventType)
    }

    return {
      isOpened,
      eventHandle
    }
  }
})
</script>
