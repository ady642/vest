<template>
  <div class="period-selector__inputs__date-picker">
    <div class="period-selector__inputs__date-picker-title">{{ title }}</div>
    <natto-date-picker
      v-model="date"
      :lockafter="lockAfter"
      :lockbefore="lockBefore"
      :placeholder="placeholder"
      format="DD-MM-YYYY"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NattoDatePicker from '@/Common/components/Dates/NattoDatePicker.vue'
import useVModel from '@/Common/hooks'

export default defineComponent({
  name: 'SearchDatePicker',
  components: { NattoDatePicker },
  props: {
    modelValue: {
      type: String,
      required: true
    },
    lockAfter: String,
    lockBefore: String,
    placeholder: String,
    title: String
  },

  emits: ['update:modelValue'],

  setup(props) {
    const date = useVModel(props)

    return {
      date
    }
  }
})
</script>

<style lang="scss">
.period-selector__inputs {
  &__date-picker {
    width: 100%;
    .el-input {
      width: 100%;
    }
    &-title {
      font-size: 12px;
      color: black;
      margin-bottom: 4px;
    }
  }
}
</style>
