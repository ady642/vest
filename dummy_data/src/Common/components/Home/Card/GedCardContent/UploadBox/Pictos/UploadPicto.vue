<template>
  <img class="ged-upload-picto" :src="UploadBoxSvg" alt="upload-picto" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UploadBoxSvg from '@/assets/Upload/uploadBox.svg'

export default defineComponent({
  name: 'UploadPicto',

  setup() {
    return {
      UploadBoxSvg
    }
  }
})
</script>

<style scoped>
.ged-upload-picto {
  width: 129px;
}
</style>
