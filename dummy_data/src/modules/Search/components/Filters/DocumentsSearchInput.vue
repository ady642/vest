<template>
  <natto-input
    class="documents-filters__search-input"
    v-model="searchInput"
    :placeholder="$t('ged.search.input.placeholder')"
    :debounceTime="500"
    clearable
    @clear="handleClear"
  >
    <template #prefix>
      <div class="documents-filters__search-input__icon">
        <mp-icon name="search" />
      </div>
    </template>
  </natto-input>
</template>

<script lang="ts">
import NattoInput from '@/Common/components/Inputs/NattoInput.vue'
import { defineComponent } from 'vue'
import useVModel from '@/Common/hooks'

export default defineComponent({
  name: 'DocumentsSearchInput',
  components: {
    NattoInput
  },
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },

  emits: ['update:modelValue'],

  setup(props) {
    const searchInput = useVModel(props)

    const handleClear = () => {
      searchInput.value = ''
    }

    return {
      searchInput,
      handleClear
    }
  }
})
</script>

<style lang="scss" scoped>
.documents-filters__search-input {
  margin-right: 16px;
}
</style>
