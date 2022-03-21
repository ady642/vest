<template>
  <ElRadioGroup>
    <MpRadio
      v-for="radioItem in radioItems"
      :key="radioItem.value"
      :label="radioItem.value"
    >
      {{ radioItem.label }}
    </MpRadio>
  </ElRadioGroup>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export type RadioItem = {
  value: boolean | string | number | Record<string, any>
  label: string
}

export default defineComponent({
  name: 'NattoRadioGroup',

  props: {
    radioItems: {
      type: Array as PropType<RadioItem[]>,
      required: true
    }
  }
})
</script>
