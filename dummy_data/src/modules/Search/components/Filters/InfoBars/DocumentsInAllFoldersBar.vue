<template>
  <info-bar
    :nb-documents="nbDocumentsInAllFolders"
    title="Résultats dans toute la GED"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InfoBar from '@/modules/Search/components/Filters/InfoBars/InfoBar.vue'

export default defineComponent({
  name: 'DocumentsInAllFoldersBar',
  components: { InfoBar },
  props: {
    nbDocumentsInAllFolders: {
      type: Number,
      required: true
    }
  }
})
</script>
