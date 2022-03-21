<template>
  <div class="natto-highlighter__container">
    <span
      v-for="(splittedItem, index) in textSplitted"
      :key="`splitted ${index}`"
    >
      <MpHighlight
        v-if="compareSplittedItemWithQuery(splittedItem)"
        :text="splittedItem"
      />
      <span v-else>{{ splittedItem }}</span>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useStringHelpers from '@/Common/hooks/useStringHelpers'

export default defineComponent({
  name: 'NattoHighlighter',

  props: {
    text: {
      type: String,
      required: true
    },
    query: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const { splitter, sanitize } = useStringHelpers()

    const textSplitted = splitter(props.text, props.query)

    const compareSplittedItemWithQuery = (splittedItem: string): boolean =>
      sanitize(splittedItem) === sanitize(props.query)

    return {
      textSplitted,
      compareSplittedItemWithQuery
    }
  }
})
</script>

<style lang="scss" scoped>
.natto-highlighter {
  &__container {
    display: flex;
    white-space: pre-wrap;
  }
}
</style>
