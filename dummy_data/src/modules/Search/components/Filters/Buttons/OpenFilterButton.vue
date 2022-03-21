<template>
  <natto-badge :value="activeFiltersCount">
    <MpAdvancedSearchBtn
      :text="$tc('ged.search.input.advanced')"
      :active="displayAdvancedSearch"
      @click="$emit('open-advanced-filters')"
    />
  </natto-badge>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NattoBadge from '@/Common/components/Badges/NattoBadge.vue'

export default defineComponent({
  name: 'OpenFilterButton',
  props: {
    activeFiltersCount: Number,
    displayAdvancedSearch: Boolean
  },
  components: {
    NattoBadge
  },
  emits: ['open-advanced-filters']
})
</script>
