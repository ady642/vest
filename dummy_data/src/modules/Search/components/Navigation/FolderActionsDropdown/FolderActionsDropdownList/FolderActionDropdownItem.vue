<template>
  <natto-dropdown-item
    :icon="icon"
    :label="label"
    :disabled="disabled"
    :tooltip-content="noPermissionToDeleteFolder"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NattoDropdownItem from '@/Common/components/Dropdown/NattoDropdownItem.vue'
import constants from '@/Common/constants'

export default defineComponent({
  name: 'FolderActionDropdownItem',
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
    disabled: Boolean
  },

  setup() {
    return {
      noPermissionToDeleteFolder: constants.messages.folders.delete.error
    }
  }
})
</script>
