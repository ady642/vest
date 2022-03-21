<template>
  <natto-tooltip :disabled="!disabled">
    <el-dropdown-item
      :disabled="disabled"
      :icon="`el-icon-${icon}`"
      @click="handleItemClick"
    >
      {{ label }}
    </el-dropdown-item>
    <template #content>
      {{ tooltipContent }}
    </template>
  </natto-tooltip>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NattoTooltip from '@/Common/components/Tooltips/NattoTooltip.vue'

export default defineComponent({
  name: 'NattoDropdownItem',
  components: { NattoTooltip },
  props: {
    icon: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      required: true
    },
    disabled: Boolean,
    tooltipContent: String
  },

  emits: ['click'],

  setup(props, { emit }) {
    return {
      handleItemClick: () => {
        emit('click')
      }
    }
  }
})
</script>
