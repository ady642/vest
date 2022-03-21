<template>
  <el-badge class="natto-badge" :hidden="value === 0" :value="value">
    <slot />
  </el-badge>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NattoBadge',

  props: {
    value: {
      type: Number,
      required: true
    }
  }
})
</script>

<style lang="scss">
.natto-badge {
  .el-badge__content.is-fixed {
    transform: translateY(-50%) translateX(50%);
  }
}
</style>
