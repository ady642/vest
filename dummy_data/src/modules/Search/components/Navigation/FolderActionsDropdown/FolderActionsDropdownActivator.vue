<template>
  <button class="folder-actions-dropdown__activator">
    <natto-icon element-name="more" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NattoIcon from '@/Common/components/Icons/NattoIcon.vue'

export default defineComponent({
  name: 'FolderActionsDropdownActivator',
  components: { NattoIcon }
})
</script>

<style lang="scss" scoped>
.folder-actions-dropdown__activator {
  border: none;
  border-radius: 8px;
  transform: rotate(90deg);
  background: transparent;
  cursor: pointer;
  transition: ease-in-out 100ms background;
  width: 32px;
  height: 32px;
  color: var(--secondary-text);

  &:hover {
    background: var(--border-light);
  }
}
</style>
