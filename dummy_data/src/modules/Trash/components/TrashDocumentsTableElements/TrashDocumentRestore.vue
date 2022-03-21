<template>
  <documents-table-element width="3%">
    <template #item="{ props }">
      <div
        :class="
          props.restorationStatus === inProgressConst
            ? 'restore-icon-disabled'
            : 'restore-icon'
        "
        @click="$emit('restore-icon-click', props.id)"
      >
        <restore-icon />
      </div>
    </template>
    <template #header> </template>
  </documents-table-element>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DocumentsTableElement from '@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentsTableElement.vue'
import RestoreIcon from '@/Common/components/Icons/RestoreIcon.vue'
import constants from '@/Common/constants'

export default defineComponent({
  name: 'TrashDocumentRestore',
  emits: ['restore-icon-click'],
  components: {
    DocumentsTableElement,
    RestoreIcon
  },

  setup() {
    return {
      inProgressConst: constants.RESTORE_IN_PROGRESS
    }
  }
})
</script>

<style lang="scss">
.restore-icon {
  cursor: pointer;
}
.restore-icon-disabled {
  cursor: not-allowed;
}
</style>
