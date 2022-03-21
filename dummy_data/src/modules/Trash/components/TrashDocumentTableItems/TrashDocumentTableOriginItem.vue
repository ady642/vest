<template>
  <div class="document-item__origin">
    <filename-text :filename="origin" :max-length="45" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FilenameText from '@/Common/components/Text/FilenameText.vue'

export default defineComponent({
  name: 'TrashDocumentTableOriginItem',
  components: { FilenameText },

  props: {
    origin: {
      type: String,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.document-item__origin {
  font-weight: bold;
  color: #3c3c3b;
}
</style>
