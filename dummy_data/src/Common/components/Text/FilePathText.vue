<template>
  <div v-if="filePath" :title="filePath.join('/')">
    <span v-for="(item, index) in formattedFilePath" :key="item">
      <span>
        {{ item }}
      </span>
      <span
        v-if="index !== formattedFilePath.length - 1"
        class="el-icon-arrow-right"
      />
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
export default defineComponent({
  name: 'FilePathText',
  props: {
    filePath: {
      type: Array as PropType<string[]>,
      required: true
    }
  },
  setup(props) {
    const formattedFilePath = computed(() => {
      if (!props.filePath) {
        return []
      }

      return props.filePath.length < 6
        ? props.filePath
        : [props.filePath[0], '...', props.filePath[props.filePath.length - 1]]
    })

    return {
      formattedFilePath
    }
  }
})
</script>
