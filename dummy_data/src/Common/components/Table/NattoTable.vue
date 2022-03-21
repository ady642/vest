<template>
  <natto-table-custom-header
    v-if="hideHeader"
    :areAllSelected="areAllSelected"
    :sort-options="sortOptions"
    @sort-arbo-table="propagateSortEvent"
    @select-all="$emit('select-all')"
  />
  <div
    ref="nattoTableContainerRef"
    class="natto-table--scrollable natto-scrollbar"
  >
    <slot name="prepend-table" />
    <MpTable
      ref="mpTableRef"
      v-infinite-scroll="emitOnScrollToBottom"
      :infinite-scroll-disabled="infiniteScrollDisabled"
      v-loading="loading"
      class="natto-table"
      :is-selection="isSelection"
      :highlight-row-on-click="highlightRowOnClick"
      selection-width="10%"
      :cell-class-name="cellClassName"
      :row-class-name="rowClassName"
      :show-header="!hideHeader"
      :data="tableData"
      @row-click="handleRowClick"
      @selection-change="selectionChangeHandler"
    >
      <template #empty>
        <div id="default-message" v-if="!loading">Aucun document</div>
      </template>
      <slot />
    </MpTable>
  </div>
  <slot name="append-table" />
  <natto-pagination
    v-show="displayPagination"
    class="natto-table__pagination"
    :items-total="itemsTotal"
    :page-size="itemsPerPage"
    :pageNumber="pageNumber"
    @page-opened="handlePageOpened"
  />
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import NattoTableCustomHeader from '@/Common/components/Table/NattoTableCustomHeader.vue'
import NattoPagination from '@/Common/components/Paging/NattoPagination.vue'
import DocumentsSortOptions from '@/modules/Search/models/Documents/Query/DocumentsSortOptions'

export type ElementPlusTablePayload = {
  row: any
  rowIndex: number
}

export default defineComponent({
  name: 'NattoTable',
  components: { NattoPagination, NattoTableCustomHeader },
  props: {
    sortOptions: {
      type: DocumentsSortOptions
    },
    tableData: {
      type: Array,
      required: true
    },
    itemsTotal: {
      type: Number,
      default: 0
    },
    itemsPerPage: {
      type: Number,
      default: 10
    },
    pageNumber: {
      type: Number,
      default: 1
    },
    loading: Boolean,
    hideHeader: Boolean,
    paginated: Boolean,
    infiniteScrollFinished: Boolean,
    areAllSelected: Boolean,
    cellClassName: {
      type: Function as PropType<
        (elementPayload: {
          row?: unknown
          column?: unknown
          rowIndex?: number
          columnIndex?: number
        }) => string
      >,
      default: () => ''
    },
    rowClassName: {
      type: Function,
      default: undefined
    },
    isSelection: Boolean,
    highlightRowOnClick: Boolean
  },
  emits: [
    'page-opened',
    'on-scroll-to-bottom',
    'sort-arbo-table',
    'row-clicked',
    'selection-change',
    'select-all'
  ],

  setup(props, { emit }) {
    const mpTableRef = ref(null as any)
    const nattoTableContainerRef = ref(document.createElement('div'))

    const clearSelection = () => {
      mpTableRef?.value?.ElTableInstance?.clearSelection()
      mpTableRef?.value?.handleSelectionChange([])
    }

    const selectRow = (documentId: string) => {
      mpTableRef?.value?.handleRowClick({ id: documentId })
    }

    const toggleAll = () => {
      mpTableRef?.value?.ElTableInstance?.toggleAllSelection()
    }

    return {
      clearSelection,
      selectRow,
      mpTableRef,
      toggleAll,
      displayPagination: computed(() => {
        return !props.loading && props.paginated
      }),
      emitOnScrollToBottom: () => {
        if (!props.paginated) {
          emit('on-scroll-to-bottom')
        }
      },
      propagateSortEvent: (data: DocumentsSortOptions) => {
        emit('sort-arbo-table', data)
      },
      infiniteScrollDisabled: computed(
        () => props.infiniteScrollFinished || props.loading
      ),
      handleRowClick: (row: ElementPlusTablePayload) => {
        emit('row-clicked', row)
      },
      selectionChangeHandler: (documentIds: string[]) => {
        emit('selection-change', documentIds)
      },
      handlePageOpened: (page: number) => {
        emit('page-opened', page)
        nattoTableContainerRef.value.scrollTo({
          top: 0
        })
      },
      nattoTableContainerRef
    }
  }
})
</script>

<style lang="scss">
.natto-table {
  &--scrollable {
    overflow-y: auto;
    overflow-x: hidden;
    max-height: calc(85vh - 300px);
  }

  .justify-center {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 76px;
  }

  .el-loading-mask {
    position: sticky;
    bottom: 50%;
    background-color: #ffffff60;
  }

  &__loading-icon {
    display: flex;
    justify-content: center;
  }

  &__pagination {
    display: flex;
    justify-content: center;
    margin-top: clamp(20px, 2vw, 40px);
  }

  &.el-table {
    background-color: transparent;

    tr {
      background-color: transparent;
    }

    th {
      background-color: transparent;
    }

    .el-table-column--selection {
      .cell {
        padding-left: 14px;
      }
    }

    .el-table__body,
    .el-table__footer,
    .el-table__header,
    .el-table__empty-block {
      width: 100% !important;
    }
  }
}
</style>
