<template>
  <span>{{ filenameFormatted }}</span>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import useStringHelpers from '@/Common/hooks/useStringHelpers'
export default defineComponent({
  name: 'FilenameText',
  props: {
    filename: {
      type: String,
      required: true
    },
    maxLength: {
      type: [Number, String],
      default: 45,
      validator: (value: number) => value >= 45
    }
  },
  setup(props) {
    const { ellipsify } = useStringHelpers()

    const filenameFormatted = computed(() =>
      ellipsify(props.filename, Number(props.maxLength))
    )

    return {
      filenameFormatted
    }
  }
})
</script>
