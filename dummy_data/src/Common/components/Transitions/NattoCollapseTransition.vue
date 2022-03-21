<template>
  <el-collapse-transition>
    <slot />
  </el-collapse-transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NattoCollapseTransition'
})
</script>
