<template>
  <natto-tag class="preview-modal__document-type">
    <MpIcon :name="documentTypeIcon(type)" />
  </natto-tag>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useDocumentTypeComputed from '@/modules/Search/components/Drawer/DocumentTypeTag/documentTypeComputeds'
import NattoTag from '@/Common/components/Tags/NattoTag.vue'

export default defineComponent({
  name: 'PreviewModalDocumentType',
  components: { NattoTag },
  props: {
    type: {
      type: String,
      default: 'file'
    }
  },

  setup() {
    const { documentTypeIcon } = useDocumentTypeComputed()

    return {
      documentTypeIcon
    }
  }
})
</script>

<style lang="scss">
.preview-modal__document-type {
  &.natto-tag {
    border-radius: 4px;
    padding: 8px;
    justify-content: center;
    align-items: center;
    font-size: large;
    background: var(--grey-50);
    color: var(--grey-800);
  }
}
</style>
