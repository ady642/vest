<template>
  <document-certify-tag class="certified-tag-drawer" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DocumentCertifyTag from '@/modules/Search/components/Tags/DocumentCertifyTag.vue'

export default defineComponent({
  name: 'CertifiedTagDrawer',
  components: { DocumentCertifyTag }
})
</script>

<style lang="scss">
.certified-tag-drawer {
  &.el-tag {
    background: var(--grey-50);
  }
}
</style>
