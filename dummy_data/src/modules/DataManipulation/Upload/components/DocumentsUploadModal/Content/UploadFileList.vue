<template>
  <el-scrollbar height="384px" always="true" native="true">
    <upload-file-list-item
      v-for="(item, index) in files"
      :key="item.file.name"
      :selected="index === selectedFileIndex"
      :file="item"
      @click="fileItemClicked(index)"
    />
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import UploadFileListItem from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/UploadFileListItem.vue'
import FileUpload from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'

export default defineComponent({
  name: 'UploadFileList',
  components: {
    UploadFileListItem
  },
  props: {
    selectedFileIndex: {
      type: Number,
      default: 0
    },
    files: {
      type: Array as PropType<FileUpload[]>,
      required: true
    }
  },
  emits: ['display-file'],

  setup(props, { emit }) {
    const fileItemClicked = (selectedFileIndex: number) => {
      emit('display-file', selectedFileIndex)
    }

    return {
      fileItemClicked
    }
  }
})
</script>
