<template>
  <el-button
    :loading="loading"
    :disabled="disabled"
    :type="type"
    :native-type="nativeType"
  >
    <slot />
  </el-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NattoButton',

  props: {
    nativeType: String,
    type: String,
    loading: Boolean,
    disabled: Boolean
  }
})
</script>
