<template>
  <div class="document-item__path">
    <file-path-text :file-path="path" :max-length="45" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import FilePathText from '@/Common/components/Text/FilePathText.vue'

export default defineComponent({
  name: 'DocumentPathItem',
  components: { FilePathText },

  props: {
    path: {
      type: Array as PropType<string[]>,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.document-item__path {
  font-size: 12px;
  line-height: 16px;
  color: #6b6e74;
}
</style>
