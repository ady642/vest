<template>
  <div class="advanced-search-options__container">
    <div class="advanced-search-options__filters">
      <period-selector v-model="periodValue" />
    </div>
    <div class="advanced-search-options__actions">
      <reset-search-button @clicked="$emit('reset-filters-clicked')" />
      <search-button @clicked="$emit('search-clicked')" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ResetSearchButton from '@/modules/Search/components/Filters/Buttons/ResetSearchButton.vue'
import SearchButton from '@/modules/Search/components/Filters/Buttons/SearchButton.vue'
import PeriodSelector from '@/modules/Search/components/Filters/AdvancedSearchOptions/PeriodSelector.vue'
import useVModel from '@/Common/hooks'
import Period from '@/Common/models/List/Period'

export default defineComponent({
  name: 'AdvancedSearchOptions',
  components: {
    PeriodSelector,
    ResetSearchButton,
    SearchButton
  },

  props: {
    certified: {
      type: [String, Boolean],
      required: true
    },
    period: {
      type: Period,
      required: true
    }
  },

  emits: [
    'reset-filters-clicked',
    'search-clicked',
    'update:period',
    'update:certified'
  ],

  setup(props) {
    const certifiedValue = useVModel(props, 'certified')
    const periodValue = useVModel(props, 'period')

    return {
      certifiedValue,
      periodValue
    }
  }
})
</script>

<style lang="scss" scoped>
.advanced-search-options {
  &__container {
    background: white;
    padding: 0 16px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    box-shadow: 0 12px 28px rgba(87, 94, 107, 0.08);
  }

  &__filters {
    border-radius: 4px;
    padding: 32px;
    background: var(--grey-50);
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
    padding-bottom: 16px;
  }
}
</style>
