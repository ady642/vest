<template>
  <div class="period-selector__container">
    <div class="period-selector__inputs">
      <div class="period-selector__inputs__select">
        <div class="period-selector__inputs__select-title">
          {{ $t('ged.search.filters.period.title') }}
        </div>
        <natto-select
          v-model="selectedPeriod"
          :options="periodOptions"
          @update:modelValue="handleSelectChange"
        />
      </div>
      <span class="period-selector__inputs-separator">ou</span>
      <div class="period-selector__inputs-date-pickers">
        <start-date-picker
          v-model="startDate"
          :lock-after="endDate"
          :placeholder="$t('ged.search.filters.period.beginning')"
          @update:modelValue="handleStartDateChange"
        />
        <end-date-picker
          v-model="endDate"
          :lock-before="startDate"
          :placeholder="$t('ged.search.filters.period.end')"
          @update:modelValue="handleEndDateChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import NattoSelect from '@/Common/components/Select/NattoSelect.vue'
import SelectOption from '@/Common/models/Select/SelectOption'
import useVModel from '@/Common/hooks'
import Period from '@/Common/models/List/Period'
import useDates from '@/Common/hooks/useDates'
import StartDatePicker from '@/modules/Search/components/Filters/AdvancedSearchOptions/StartDatePicker.vue'
import EndDatePicker from '@/modules/Search/components/Filters/AdvancedSearchOptions/EndDatePicker.vue'

export default defineComponent({
  name: 'PeriodSelector',
  components: { EndDatePicker, StartDatePicker, NattoSelect },
  props: {
    modelValue: {
      type: Period,
      required: true
    }
  },

  setup(props) {
    const period = useVModel(props)
    const selectedPeriod = ref<number | undefined>(undefined)
    const startDate = ref<string>('')
    const endDate = ref<string>('')
    const { dateNow, subtractInDays } = useDates()

    const SELECT_OPTIONS = {
      NO_PERIOD: undefined,
      ONE_DAY: 1,
      SEVEN_DAYS: 7,
      THIRTY_DAYS: 30
    }

    const periodOptions = [
      new SelectOption('', SELECT_OPTIONS.NO_PERIOD),
      new SelectOption('Les dernières 24h', SELECT_OPTIONS.ONE_DAY),
      new SelectOption('Les 7 derniers jours', SELECT_OPTIONS.SEVEN_DAYS),
      new SelectOption('Les 30 derniers jours', SELECT_OPTIONS.THIRTY_DAYS)
    ]

    const handleSelectChange = (selectOption: number) => {
      if (selectOption === SELECT_OPTIONS.NO_PERIOD) {
        period.value = new Period()

        return
      }

      period.value = new Period({
        startDate: subtractInDays(dateNow(), selectOption),
        endDate: dateNow()
      })
    }

    const handleStartDateChange = (datePickerValue: string) => {
      period.value = new Period({
        startDate: datePickerValue,
        endDate: endDate.value
      })
      selectedPeriod.value = SELECT_OPTIONS.NO_PERIOD
    }

    const handleEndDateChange = (datePickerValue: string) => {
      period.value = new Period({
        startDate: startDate.value,
        endDate: datePickerValue
      })
      selectedPeriod.value = SELECT_OPTIONS.NO_PERIOD
    }

    watch(
      () => props.modelValue,
      (newPeriod: Period) => {
        if (newPeriod.startDate || newPeriod.endDate) {
          startDate.value = newPeriod.startDate
          endDate.value = newPeriod.endDate
        } else {
          startDate.value = ''
          endDate.value = ''
          selectedPeriod.value = SELECT_OPTIONS.NO_PERIOD
        }
      }
    )

    return {
      period,
      periodOptions,
      handleSelectChange,
      selectedPeriod,
      handleStartDateChange,
      handleEndDateChange,
      startDate,
      endDate
    }
  }
})
</script>

<style lang="scss">
.period-selector {
  &__container {
    display: flex;
    flex-direction: column;
    row-gap: 15px;
  }

  &__inputs {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    column-gap: 20px;

    &-separator {
      align-self: end;
      justify-content: center;
      padding-bottom: 10px;
    }

    &__select {
      flex-basis: 30%;
      .el-select {
        width: 100%;
      }
      &-title {
        font-size: clamp(12px, 1vw, 16px);
        font-weight: 600;
        color: var(--grey-500);
        margin-bottom: 5px;
        white-space: nowrap;
      }
    }

    &-date-pickers {
      display: flex;
      column-gap: 5px;
      width: 100%;
    }
  }
}
</style>
