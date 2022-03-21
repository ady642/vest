<template>
  <natto-upload-type-popup
    v-model="isOpened"
    :folders="folders"
    @popup-folder-select-close="handleClose"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useVModel from '@/Common/hooks'
import NattoUploadTypePopup from '@/Common/components/Modals/NattoUploadTypePopup.vue'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'

export default defineComponent({
  name: 'WhoUploadModal',
  components: {
    NattoUploadTypePopup
  },
  props: {
    modelValue: Boolean,
    folders: {
      type: Folders,
      required: true
    }
  },
  emits: ['popup-folder-select-close', 'update:modelValue'],
  setup(props, { emit }) {
    const isOpened = useVModel(props)

    const handleClose = () => {
      emit('popup-folder-select-close')
    }

    return { isOpened, handleClose }
  }
})
</script>
