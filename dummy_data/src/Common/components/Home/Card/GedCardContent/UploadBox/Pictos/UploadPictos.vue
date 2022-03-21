<template>
  <div class="icon-box">
    <wait-picto v-if="isUploading" />
    <upload-picto v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WaitPicto from '@/Common/components/Home/Card/GedCardContent/UploadBox/Pictos/WaitPicto.vue'
import UploadPicto from '@/Common/components/Home/Card/GedCardContent/UploadBox/Pictos/UploadPicto.vue'

export default defineComponent({
  name: 'UploadPictos',
  components: { UploadPicto, WaitPicto },
  props: {
    isUploading: Boolean
  }
})
</script>
