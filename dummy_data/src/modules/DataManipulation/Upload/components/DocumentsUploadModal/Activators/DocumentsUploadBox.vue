<template>
  <natto-upload-box :disabled="disabled" :supportedTypes="types" />
</template>

<script lang="ts">
import NattoUploadBox from '@/Common/components/Upload/Box/NattoUploadBox.vue'
import constants from '@/Common/constants'
import { defineComponent, onMounted } from 'vue'
import { router } from '@kpmg/mypulse-shared-dependencies'

export default defineComponent({
  name: 'DocumentsUploadBox',
  components: { NattoUploadBox },
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const types = constants.allowedTypes

    onMounted(() => {
      if (router.currentRoute.value.query.openSelectFilesWindow) {
        const uploadBox: (HTMLDivElement & { click: () => void }) | null =
          document.querySelector('.upload-box-inner')

        uploadBox?.click()
      }
    })

    return {
      types
    }
  }
})
</script>
