<template>
  <natto-dropdown-item
    :icon="icon"
    :label="label"
    :disabled="disabled"
    :tooltip-content="tooltipContent"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NattoDropdownItem from '@/Common/components/Dropdown/NattoDropdownItem.vue'

export default defineComponent({
  name: 'DocumentActionDropdownItem',
  components: { NattoDropdownItem },
  props: {
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: ''
    },
    disabled: Boolean,
    tooltipContent: String
  }
})
</script>
