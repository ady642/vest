<template>
  <section class="folder-actions-dropdown__list">
    <document-action-dropdown-item
      v-for="{ id, label, icon, action } in documentActions"
      :key="id"
      :label="label"
      :icon="icon"
      @click="handleClickItem(action)"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import DocumentActionDropdownItem from '@/modules/Search/components/DocumentsTable/DocumentsTableItems/DocumentActionDropdownItem.vue'
import { ITEMS } from '@/Common/types/actionItemTypes'

export default defineComponent({
  name: 'TrashDocumentsActionsDropdownList',
  components: { DocumentActionDropdownItem },
  props: {
    documentId: {
      type: String,
      required: true
    }
  },
  emits: ['item-clicked'],
  setup(props, { emit }) {
    const documentActions = computed(() => [
      {
        id: props.documentId,
        action: ITEMS.RESTORE,
        label: 'Restaurer',
        icon: 'refresh-left'
      }
    ])

    return {
      documentActions,
      handleClickItem: (action: string) => {
        emit('item-clicked', action, props.documentId)
      }
    }
  }
})
</script>
