<template>
  <section class="ged-card-upload-box">
    <upload-pictos :is-uploading="isUploading" />
    <upload-texts :is-uploading="isUploading" />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UploadTexts from '@/Common/components/Home/Card/GedCardContent/UploadBox/Texts/UploadTexts.vue'
import UploadPictos from '@/Common/components/Home/Card/GedCardContent/UploadBox/Pictos/UploadPictos.vue'

export default defineComponent({
  name: 'GedCardUploadBox',
  components: { UploadPictos, UploadTexts },
  props: {
    isUploading: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss">
.ged-card-upload-box {
  display: flex;
  border: 1.5px dashed var(--grey-300);
  cursor: pointer;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 12px;
}
</style>
