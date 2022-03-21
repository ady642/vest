<template>
  <div class="preview-modal__certified-tag__container">
    <document-certify-tag class="preview-modal__certified-tag" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DocumentCertifyTag from '@/modules/Search/components/Tags/DocumentCertifyTag.vue'

export default defineComponent({
  name: 'PreviewModalCertifiedTag',
  components: { DocumentCertifyTag }
})
</script>

<style lang="scss">
.preview-modal__certified-tag {
  &__container {
    margin-left: clamp(30px, 3vw, 45px);
  }

  &.el-tag {
    background: var(--grey-50);
  }
}
</style>
