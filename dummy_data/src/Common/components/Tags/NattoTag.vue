<template>
  <el-tag :class="$attrs.class" class="natto-tag" :closable="closable">
    <slot />
  </el-tag>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NattoTag',

  props: {
    closable: Boolean
  }
})
</script>

<style lang="scss">
.natto-tag {
  &.el-tag {
    display: flex;
    border-radius: 30px;
    padding: 8px 16px;
    border: none;
  }
}
</style>
