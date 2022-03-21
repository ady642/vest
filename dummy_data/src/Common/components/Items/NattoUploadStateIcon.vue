<template>
  <component :is="myComponent" />
</template>

<script lang="ts">
import WarningIcon from '@/Common/components/Icons/WarningIcon.vue'
import LoadedIcon from '@/Common/components/Icons/LoadedIcon.vue'
import LoadingIcon from '@/Common/components/Icons/LoadingIcon.vue'
import PendingIcon from '@/Common/components/Icons/PendingIcon.vue'
import { defineComponent, computed } from 'vue'
import { StateUpload } from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'
import FileIcon from '@/Common/components/Icons/FileIcon.vue'

export default defineComponent({
  name: 'NattoUploadStateIcon',
  props: {
    statusIcon: {
      type: Number,
      required: true
    }
  },
  components: {
    WarningIcon,
    LoadedIcon,
    LoadingIcon,
    PendingIcon
  },
  setup(props) {
    const myComponent = computed(() => {
      switch (props.statusIcon) {
        case StateUpload.ERROR:
          return WarningIcon
        case StateUpload.CANCELED:
          return WarningIcon
        case StateUpload.UPLOADING:
          return LoadingIcon
        case StateUpload.UPLOADED:
          return LoadedIcon
        case StateUpload.PENDING:
          return PendingIcon
        default:
          return FileIcon
      }
    })

    return {
      myComponent
    }
  }
})
</script>
