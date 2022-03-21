<template>
  <iframe :src="urlFile" class="natto-doc-viewer" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'NattoDocViewer',

  props: {
    file: {
      type: Blob,
      required: true
    }
  },

  setup(props) {
    const urlFile = computed(() => URL.createObjectURL(props.file))

    return {
      urlFile
    }
  }
})
</script>

<style lang="scss" scoped>
.natto-doc-viewer {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
