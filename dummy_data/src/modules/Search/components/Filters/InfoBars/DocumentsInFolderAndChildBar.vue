<template>
  <info-bar
    :nb-documents="nbDocumentsInFolderAndChild"
    title="Résultats dans ce dossier et enfants"
    :display-arrow="false"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InfoBar from '@/modules/Search/components/Filters/InfoBars/InfoBar.vue'

export default defineComponent({
  name: 'DocumentsInFolderAndChildBar',
  components: { InfoBar },
  props: {
    nbDocumentsInFolderAndChild: {
      type: Number,
      required: true
    }
  }
})
</script>
