<template>
  <div class="multiple-documents-ctas">
    <download-cta
      :selected-documents-ids="selectedDocumentsIds"
      @click="$emit('download-all-clicked')"
    />
    <delete-cta
      :selected-documents-ids="selectedDocumentsIds"
      @click="$emit('delete-all-clicked')"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import DownloadCta from '@/modules/Search/components/Buttons/MultipleDocumentsCtas/DownloadCta.vue'
import DeleteCta from '@/modules/Search/components/Buttons/MultipleDocumentsCtas/DeleteCta.vue'

export default defineComponent({
  name: 'MultipleDocumentsCtas',
  components: { DeleteCta, DownloadCta },
  props: {
    selectedDocumentsIds: {
      type: Array as PropType<string[]>,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.multiple-documents-ctas {
  display: flex;
  justify-content: flex-end;
  column-gap: 15px;
  margin-bottom: 20px;
}
</style>
