<template>
  <div class="file-item" :class="{ selected }">
    <document-upload-state-icon :status="file.state" class="flex-item" />
    <filename-text :filename="file.file.name" class="flex-item" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FilenameText from '@/Common/components/Text/FilenameText.vue'
import DocumentUploadStateIcon from '@/modules/Search/components/DocumentUploadStateIcon.vue'
import FileUpload from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'

export default defineComponent({
  name: 'UploadFileListItem',
  components: {
    FilenameText,
    DocumentUploadStateIcon
  },
  props: {
    file: {
      type: FileUpload,
      required: true
    },
    selected: Boolean
  }
})
</script>

<style lang="scss" scoped>
.file-item {
  display: grid;
  grid-template-columns: 20% auto;
  align-items: center;
  justify-items: center;
  box-shadow: 0 6px 20px rgba(71, 71, 71, 0.03);
  border-radius: 8px;
  cursor: pointer;
  padding: 10px;
  margin: 5px 0;
  height: 50px;
  justify-content: start;
  &.selected {
    background: #ebebff;
  }

  &:hover {
    background: #ebebff;
  }

  span {
    max-width: 164px;
    font-weight: 700;
    line-height: 16px;
    font-size: 13px;
    color: #3c3c3b;
  }
}
</style>
