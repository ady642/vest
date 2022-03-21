<template>
  <natto-tooltip :disabled="!disabled">
    <natto-button
      class="create-folder-button"
      :class="{ 'folder-disabled': disabled }"
      @click="handleItemClick"
    >
      <natto-icon :elementName="'folder-add'"
    /></natto-button>
    <template #content>
      {{ tooltipContent }}
    </template>
  </natto-tooltip>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NattoButton from '@/Common/components/Buttons/NattoButton.vue'
import NattoIcon from '@/Common/components/Icons/NattoIcon.vue'
import NattoTooltip from '@/Common/components/Tooltips/NattoTooltip.vue'
import constants from '@/Common/constants'

export default defineComponent({
  name: 'DocumentsCreateFolderButton',
  emits: ['click'],
  props: {
    disabled: Boolean
  },
  components: {
    NattoButton,
    NattoIcon,
    NattoTooltip
  },
  setup(props, { emit }) {
    return {
      tooltipContent: constants.messages.folders.create.error,
      handleItemClick: () => {
        emit('click')
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.create-folder-button {
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-color: white;
  color: #4e50f5;
  font-size: 20px;

  &.folder-disabled {
    color: #bbb;
  }

  &:hover {
    background: white;
    border-color: white;
  }

  :focus {
    background: white;
    border-color: white;
  }
}
</style>
