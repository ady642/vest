<template>
  <div class="upload-infos-description">
    {{ description }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTranslation } from '@/Common/hooks/useTranslation'

export default defineComponent({
  name: 'UploadFileInfosDescription',

  props: {
    selectedFolderName: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const { t } = useTranslation()

    return {
      description: t('ged.dataManipulation.create.file.collab.description', {
        selectedFolderName: props.selectedFolderName
      })
    }
  }
})
</script>

<style scoped>
.upload-infos-description {
  word-break: break-word;
  margin: 15px;
}
</style>
