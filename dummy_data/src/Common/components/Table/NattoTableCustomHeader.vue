<template>
  <div class="browse-doc__header">
    <div class="browse-doc__header-type">
      <natto-checkbox
        :model-value="areAllSelected"
        @change="$emit('select-all')"
      />
    </div>
    <div class="browse-doc__header-name" @click="sort('name')">
      <document-name-header
        :value="$t('ged.common.table.headers.documentName')"
      />
      <div v-if="displayNameSort" class="filter-icon" :class="filterClass">
        <arrow-down-icon />
      </div>
    </div>
    <div class="browse-doc__header-date" @click="sort('updated')">
      <document-creation-date-header
        :value="$t('ged.common.table.headers.date')"
      />
      <div v-if="displayDateSort" class="filter-icon" :class="filterClass">
        <arrow-down-icon />
      </div>
    </div>
    <div class="browse-doc__header-action">
      <document-action-header />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import DocumentNameHeader from '@/modules/Search/components/DocumentsTable/DocumentsTableHeaders/DocumentNameHeader.vue'
import DocumentCreationDateHeader from '@/modules/Search/components/DocumentsTable/DocumentsTableHeaders/DocumentCreationDateHeader.vue'
import DocumentActionHeader from '@/modules/Search/components/DocumentsTable/DocumentsTableHeaders/DocumentActionHeader.vue'
import ArrowDownIcon from '@/Common/components/Icons/ArrowDownIcon.vue'
import SortOptions from '@/Common/models/List/SortOptions'
import DocumentsSortOptions from '@/modules/Search/models/Documents/Query/DocumentsSortOptions'
import NattoCheckbox from '@/Common/components/Checkboxes/NattoCheckbox.vue'

export default defineComponent({
  name: 'NattoTableCustomHeader',
  props: {
    sortOptions: SortOptions,
    areAllSelected: Boolean
  },
  emits: ['sort-arbo-table'],
  components: {
    NattoCheckbox,
    DocumentActionHeader,
    DocumentCreationDateHeader,
    DocumentNameHeader,
    ArrowDownIcon
  },
  setup(props, { emit }) {
    return {
      displayNameSort: computed(
        () =>
          props.sortOptions?.sortBy == 'name' &&
          props.sortOptions?.sortDirection
      ),
      displayDateSort: computed(
        () =>
          props.sortOptions?.sortBy == 'updated' &&
          props.sortOptions?.sortDirection
      ),
      filterClass: computed(() => {
        return props.sortOptions?.sortDirection == 'ascending'
          ? 'filter-icon-asc'
          : 'filter-icon-desc'
      }),
      sort: (field: string) => {
        if (field === props.sortOptions?.sortBy) {
          emit(
            'sort-arbo-table',
            new DocumentsSortOptions({
              sortBy: field,
              sortDirection:
                props.sortOptions?.sortDirection === 'ascending'
                  ? 'descending'
                  : props.sortOptions?.sortDirection === 'descending'
                  ? null
                  : 'ascending'
            })
          )
        } else {
          emit(
            'sort-arbo-table',
            new DocumentsSortOptions({
              sortBy: field,
              sortDirection: 'ascending'
            })
          )
        }
      }
    }
  }
})
</script>

<style lang="scss">
.browse-doc__header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 20px;
  margin-right: 8px; // scrollbar width (needed to be align with items)

  &-type {
    flex: 0.1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-indent: 14px;

    .el-checkbox {
      display: flex;
    }
  }

  &-name {
    flex: 0.55;
    display: flex;
    align-items: center;
  }

  &-date {
    flex: 0.25;
    display: flex;
    align-items: center;
  }

  &-action {
    flex: 0.1;
  }

  .filter-icon {
    img[alt='natto-icon'] {
      width: 10px;
      height: 10px;
      margin-left: 0.5vw;
    }

    &-desc {
      img[alt='natto-icon'] {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
