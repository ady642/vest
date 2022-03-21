<template>
  <natto-upload-state-icon :statusIcon="status" />
</template>

<script>
import NattoUploadStateIcon from '@/Common/components/Items/NattoUploadStateIcon'
export default {
  name: 'DocumentUploadStateIcon',
  components: { NattoUploadStateIcon },
  props: {
    status: {
      type: Number,
      required: true
    }
  }
}
</script>
