<template>
  <div
    class="documents-filters__search-bar"
    :class="{ 'documents-filters__search-bar--active': displayAdvancedSearch }"
  >
    <documents-search-input v-model="searchInput" />
    <open-filter-button
      :active-filters-count="activeFiltersCount"
      :display-advanced-search="displayAdvancedSearch"
      @click="handleOpenFiltersButtonClick"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DocumentsSearchInput from '@/modules/Search/components/Filters/DocumentsSearchInput.vue'
import OpenFilterButton from '@/modules/Search/components/Filters/Buttons/OpenFilterButton.vue'
import useVModel from '@/Common/hooks'

export default defineComponent({
  name: 'DocumentsSearchBar',
  components: { OpenFilterButton, DocumentsSearchInput },

  props: {
    activeFiltersCount: Number,
    displayAdvancedSearch: Boolean,
    search: String
  },

  emits: ['update:search', 'open-filters-button-clicked'],

  setup(props, { emit }) {
    const searchInput = useVModel(props, 'search')

    const handleOpenFiltersButtonClick = () => {
      emit('open-filters-button-clicked')
    }

    return {
      handleOpenFiltersButtonClick,
      searchInput
    }
  }
})
</script>

<style lang="scss" scoped>
.documents-filters__search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 16px;
  box-shadow: 0 12px 28px rgba(87, 94, 107, 0.08);
  border-radius: 8px;
  transition: all ease-in-out 0.2s;

  &--active {
    border-radius: 8px 8px 0 0;
    box-shadow: none;
  }
}
</style>
