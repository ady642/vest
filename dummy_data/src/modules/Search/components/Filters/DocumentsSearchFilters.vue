<template>
  <section class="document-search-filters">
    <documents-search-bar
      v-model:search="searchValue"
      :active-filters-count="activeFiltersCount"
      :display-advanced-search="displayAdvancedSearch"
      @open-filters-button-clicked="toggleFilters"
    />
    <natto-collapse-transition>
      <advanced-search-options
        v-show="displayAdvancedSearch"
        v-model:period="filters.period"
        v-model:certified="filters.certified"
        class="advanced-search-options"
        @search-clicked="handleChangeFilters"
        @reset-filters-clicked="handleReset"
      />
    </natto-collapse-transition>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AdvancedSearchOptions from '@/modules/Search/components/Filters/AdvancedSearchOptions/AdvancedSearchOptions.vue'
import DocumentsSearchBar from '@/modules/Search/components/Filters/DocumentsSearchBar.vue'
import NattoCollapseTransition from '@/Common/components/Transitions/NattoCollapseTransition.vue'
import useVModel from '@/Common/hooks'
import DocumentsFilters from '@/modules/Search/models/Documents/Query/DocumentsFilters'

export default defineComponent({
  name: 'DocumentsSearchFilters',
  components: {
    NattoCollapseTransition,
    DocumentsSearchBar,
    AdvancedSearchOptions
  },
  props: {
    search: String,
    activeFiltersCount: Number
  },

  emits: ['update:search', 'change-filters', 'reset-filters'],

  setup(props, { emit }) {
    const displayAdvancedSearch = ref(false)

    const filters = ref(new DocumentsFilters())

    const handleChangeFilters = async () => {
      emit('change-filters', filters.value)
    }

    const handleReset = async () => {
      filters.value = new DocumentsFilters()
      emit('reset-filters')
    }

    const searchValue = useVModel(props, 'search')

    const toggleFilters = () => {
      displayAdvancedSearch.value = !displayAdvancedSearch.value
    }

    return {
      displayAdvancedSearch,
      handleChangeFilters,
      searchValue,
      filters,
      toggleFilters,
      handleReset
    }
  }
})
</script>

<style lang="scss" scoped>
.document-search-filters {
  margin-bottom: 24px;
}
</style>
