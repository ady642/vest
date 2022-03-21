<template>
  <search-date-picker :title="$t('ged.common.from')" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchDatePicker from '@/modules/Search/components/Filters/AdvancedSearchOptions/SearchDatePicker.vue'

export default defineComponent({
  name: 'StartDatePicker',
  components: { SearchDatePicker }
})
</script>
