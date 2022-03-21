<template>
  <el-dialog
    v-model="isOpened"
    :key="isOpened"
    destroy-on-close
    v-bind="$attrs"
  >
    <slot />
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useVModel from '@/Common/hooks'

export default defineComponent({
  name: 'NattoDialog',

  props: {
    modelValue: Boolean
  },

  setup(props) {
    const isOpened = useVModel(props)

    return {
      isOpened
    }
  }
})
</script>
