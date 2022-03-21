<template>
  <div class="document-tags">
    <treated-tag v-if="isTreated" />
    <new-tag v-if="isNew" />
    <document-certify-tag
      v-if="hasSubscribedToVault"
      class="document-tags__certified"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TreatedTag from '@/modules/Search/components/Tags/TreatedTag.vue'
import DocumentCertifyTag from '@/modules/Search/components/Tags/DocumentCertifyTag.vue'
import NewTag from '@/modules/Search/components/Tags/NewTag.vue'

export default defineComponent({
  name: 'DocumentTags',
  components: { NewTag, DocumentCertifyTag, TreatedTag },
  props: {
    hasSubscribedToVault: Boolean,
    isTreated: Boolean,
    isNew: Boolean
  }
})
</script>

<style lang="scss" scoped>
.document-tags {
  display: flex;

  & > * {
    margin-right: 10px;
  }
}
</style>
