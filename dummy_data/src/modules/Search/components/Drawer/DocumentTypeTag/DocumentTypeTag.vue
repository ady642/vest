<template>
  <natto-tag :class="$attrs.class" class="document-type-tag">
    <MpIcon :name="documentTypeIcon(type)" />
    <span class="document-type-tag__name">{{ documentType(type) }}</span>
  </natto-tag>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NattoTag from '@/Common/components/Tags/NattoTag.vue'
import useDocumentTypeComputed from '@/modules/Search/components/Drawer/DocumentTypeTag/documentTypeComputeds'

export default defineComponent({
  name: 'DocumentTypeTag',
  components: { NattoTag },
  props: {
    type: {
      type: String,
      default: 'file'
    }
  },

  setup() {
    const { documentTypeIcon, documentType } = useDocumentTypeComputed()

    return {
      documentTypeIcon,
      documentType
    }
  }
})
</script>

<style lang="scss" scoped>
.document-type-tag {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: var(--grey-800);
  background: var(--grey-50);
  font-weight: bold;

  .mp-icon {
    margin-right: 8px;
  }

  &__name {
    font-size: 12px;
    line-height: 1px;
  }
}
</style>
