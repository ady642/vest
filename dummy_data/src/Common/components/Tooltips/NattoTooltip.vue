<template>
  <el-tooltip
    :disabled="disabled"
    :placement="placement"
    :content="content"
    effect="dark"
    :visible-arrow="false"
  >
    <slot />
    <template v-if="!content" #content>
      <slot name="content" />
    </template>
  </el-tooltip>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NattoTooltip',

  emits: ['click'],

  props: {
    disabled: Boolean,
    placement: {
      type: String,
      default: 'left'
    },
    content: String
  }
})
</script>
