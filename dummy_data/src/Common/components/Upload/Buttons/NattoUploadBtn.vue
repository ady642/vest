<template>
  <el-upload
    action=""
    :drag="isDrag"
    :class="wrapperClassName"
    :http-request="emitFilesEvent"
    :on-change="change"
    :file-list="fileList"
    :show-file-list="false"
    :disabled="disabled"
    multiple
  >
    <slot name="content"></slot>
    <div class="el-upload__text">
      <slot name="buttonSubText"></slot>
    </div>
  </el-upload>
</template>

<script>
import { defineComponent } from 'vue'
import uploadMixin from '@/Common/mixins/natto-upload'

export default defineComponent({
  name: 'NattoUploadBtn',
  mixins: [uploadMixin],
  emits: ['on-files-change'],
  props: {
    isDrag: {
      type: Boolean,
      required: true
    },
    targetInput: {
      type: String,
      required: true
    },
    wrapperClassName: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.className = this.targetInput
  }
})
</script>
