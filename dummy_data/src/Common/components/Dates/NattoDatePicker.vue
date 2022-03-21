<template>
  <el-date-picker
    class="natto-date-picker"
    v-model="selectedDate"
    type="date"
    :placeholder="placeholder"
    :disabled-date="disabledDate"
    :default-time="defaultTime"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useVModel from '@/Common/hooks'
import useDates from '@/Common/hooks/useDates'

export default defineComponent({
  name: 'NattoDatePicker',
  props: {
    placeholder: String,
    lockafter: [Date, String],
    lockbefore: [Date, String],
    modelValue: String,
    defaultTime: [Date, String]
  },
  setup(props) {
    const { isBefore, isAfter } = useDates()

    const selectedDate = useVModel(props)
    const disabledDate = function (time: Date) {
      let disabled = false

      if (props.lockafter) {
        disabled = isAfter(time.toString(), props.lockafter.toString())
      }

      if (props.lockbefore) {
        disabled =
          disabled || isBefore(time.toString(), props.lockbefore.toString())
      }

      return disabled
    }

    return { selectedDate, disabledDate }
  }
})
</script>

<style lang="scss">
.natto-date-picker {
  .el-input__inner {
    border-radius: 8px;
    &:hover {
      border-color: var(--primary);
    }
    &:focus {
      box-shadow: 0 0 0 4px var(--primary-300);
    }
  }
}
</style>
