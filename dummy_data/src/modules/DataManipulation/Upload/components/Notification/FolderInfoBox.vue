<template>
  <div class="folder-info-box-container">
    <div class="text-part-1">
      <p>{{ canUploaddescription }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import constants from '@/Common/constants'

export default defineComponent({
  name: 'FolderInfoBox',
  components: {},
  props: {
    canUpload: {
      type: Boolean,
      required: true
    },
    folderName: { type: String, required: true },
    folderDescription: { type: String, required: true }
  },
  setup(props) {
    return {
      constants,
      canUploaddescription: computed(() => {
        return `${
          props.canUpload
            ? constants.CAN_ADD_FILE_DESCRIPTION
            : constants.CAN_NOT_ADD_FILE_DESCRIPTION
        } ${props.folderName ?? ''}. ${props.folderDescription ?? ''}`
      })
    }
  }
})
</script>

//
<style lang="scss">
.folder-info-box-container {
  padding: 10px;
}
</style>
