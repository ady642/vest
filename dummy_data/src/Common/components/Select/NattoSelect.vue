<template>
  <el-select v-model="selectedValue">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script lang="ts">
import useVModel from '@/Common/hooks'
import { defineComponent, PropType } from 'vue'
import SelectOption from '@/Common/models/Select/SelectOption'

export default defineComponent({
  name: 'NattoSelect',
  props: {
    options: {
      type: Array as PropType<SelectOption[]>
    },
    modelValue: [String, Number]
  },
  setup(props) {
    const selectedValue = useVModel(props)

    return {
      selectedValue
    }
  }
})
</script>
