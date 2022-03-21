<template>
  <el-dropdown :disabled="disabled" trigger="click">
    <span class="el-dropdown-link" @click.stop>
      <slot name="activator" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <slot name="list" />
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NattoDropdown',

  props: {
    disabled: Boolean
  }
})
</script>
