<template>
  <natto-table-item :label="label" :width="width" :min-width="minWidth">
    <template #item="{ props }">
      <slot name="item" :props="props" />
    </template>
    <template #header>
      <slot name="header" />
    </template>
  </natto-table-item>
</template>

<script>
import { defineComponent } from 'vue'
import NattoTableItem from '@/Common/components/Table/NattoTableItem.vue'
export default defineComponent({
  name: 'DocumentsTableElement',
  components: { NattoTableItem },

  props: {
    label: String,
    width: [Number, String],
    minWidth: [Number, String]
  }
})
</script>
