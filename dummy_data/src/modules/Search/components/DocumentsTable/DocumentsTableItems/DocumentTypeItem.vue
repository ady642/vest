<template>
  <span class="document-type__icon">
    <file-icon />
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FileIcon from '@/Common/components/Icons/FileIcon.vue'

export default defineComponent({
  name: 'DocumentTypeItem',
  components: { FileIcon }
})
</script>

<style lang="scss" scoped>
.document-type {
  &__icon {
    display: flex;
    width: 25px;
    height: 25px;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
    padding: 4px;
    border-radius: 4px;
    background: #ebebff;
  }
}
</style>
