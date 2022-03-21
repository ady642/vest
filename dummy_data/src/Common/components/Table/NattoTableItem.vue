<template>
  <el-table-column
    :label="label"
    :width="width"
    :sortable="sortable"
    v-bind="$attrs"
  >
    <template #default="props">
      <slot name="item" :props="props.row" />
    </template>
    <template #header>
      <slot name="header" />
    </template>
  </el-table-column>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NattoTableItem',

  props: {
    label: String,
    width: {
      type: [Number, String],
      default: null
    },
    sortable: Boolean
  }
})
</script>
