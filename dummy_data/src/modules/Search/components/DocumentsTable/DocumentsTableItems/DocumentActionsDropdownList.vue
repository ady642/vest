<template>
  <section class="folder-actions-dropdown__list">
    <document-action-dropdown-item
      v-for="{
        label,
        icon,
        disabled,
        action,
        tooltipContent
      } in documentActions"
      :key="label"
      :label="label"
      :icon="icon"
      :disabled="disabled"
      :tooltip-content="tooltipContent"
      @click="handleClickItem(action)"
    />
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import DocumentActionDropdownItem from '@/modules/Search/components/DocumentsTable/DocumentsTableItems/DocumentActionDropdownItem.vue'
import useDeleteFileHelpers from '@/modules/DataManipulation/Delete/DeleteFile/store/helpers'
import { ITEMS } from '@/Common/types/actionItemTypes'
import { useTranslation } from '@/Common/hooks/useTranslation'

type ActionItem = {
  action: ITEMS
  label: string
  icon: string
  disabled?: boolean
  tooltipContent?: string
}

export default defineComponent({
  name: 'DocumentActionsDropdownList',
  components: { DocumentActionDropdownItem },
  props: {
    documentId: {
      type: String,
      required: true
    },
    displayGoTo: Boolean
  },

  setup(props, { emit }) {
    const store = useStore()

    const { isFileDeletable } = useDeleteFileHelpers(store)
    const { t } = useTranslation()

    const documentActions = computed(() => {
      const actions: ActionItem[] = [
        {
          action: ITEMS.DELETE,
          label: t('ged.common.delete'),
          icon: 'delete',
          disabled: !isFileDeletable(props.documentId),
          tooltipContent: t('ged.dataManipulation.delete.cantDelete')
        },
        {
          action: ITEMS.DOWNLOAD,
          label: t('ged.common.download'),
          icon: 'download'
        }
      ]

      if (props.displayGoTo) {
        actions.push({
          action: ITEMS.GOTO,
          label: t('ged.common.goTo'),
          icon: 'd-arrow-right'
        })
      }

      return actions
    })

    return {
      documentActions,
      handleClickItem: (action: string) => {
        emit('item-clicked', action)
      }
    }
  }
})
</script>
