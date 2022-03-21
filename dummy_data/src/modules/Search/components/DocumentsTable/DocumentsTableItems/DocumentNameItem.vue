<template>
  <div class="document-item__name">
    <natto-highlighter v-if="search" :text="ellipsifiedName" :query="search" />
    <filename-text v-else :filename="name" :max-length="45" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NattoHighlighter from '@/Common/components/Hightlighter/NattoHighlighter.vue'
import useStringHelpers from '@/Common/hooks/useStringHelpers'
import FilenameText from '@/Common/components/Text/FilenameText.vue'

export default defineComponent({
  name: 'DocumentNameItem',
  components: { FilenameText, NattoHighlighter },

  props: {
    name: {
      type: String,
      required: true
    },
    search: {
      type: String,
      default: ''
    }
  },

  setup(props) {
    const { ellipsify } = useStringHelpers()

    return {
      ellipsifiedName: ellipsify(props.name)
    }
  }
})
</script>

<style lang="scss" scoped>
.document-item__name {
  font-weight: bold;
  color: #3c3c3b;
}
</style>
