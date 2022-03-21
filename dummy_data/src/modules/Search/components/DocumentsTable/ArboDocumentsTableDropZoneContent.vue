<template>
  <ged-card-upload-box class="arbo-ged-card-upload-box" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GedCardUploadBox from '@/Common/components/Home/Card/GedCardContent/UploadBox/GedCardUploadBox.vue'

export default defineComponent({
  name: 'ArboDocumentsTableDropZoneContent',
  components: { GedCardUploadBox }
})
</script>

<style scoped>
.arbo-ged-card-upload-box {
  border: none;
}
</style>
