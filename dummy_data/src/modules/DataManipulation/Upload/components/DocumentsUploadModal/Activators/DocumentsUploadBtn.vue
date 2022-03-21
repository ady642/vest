<template>
  <natto-upload-files-btn
    :canUploadFiles="canUploadFiles"
    :hasAccessDs="hasAccessDs"
    :isMainViewBtn="isMainViewBtn"
    :disabled="disabled"
    :buttoninnerText="
      $tc('ged.dataManipulation.upload.documentUploadModal.activators.button')
    "
  />
</template>

<script lang="ts">
import NattoUploadFilesBtn from '@/Common/components/Upload/Buttons/NattoUploadFilesBtn.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'DocumentsUploadBtn',
  components: { NattoUploadFilesBtn },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    canUploadFiles: Boolean,
    hasAccessDs: Boolean,
    isMainViewBtn: Boolean
  }
})
</script>
