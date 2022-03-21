<template>
  <mp-pagination
    :page-size="pageSize"
    :current-page="pageNumber"
    :page-count="pageCount"
    hide-on-single-page
    :total="itemsTotal"
    @current-change="pageChanged"
  />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'NattoPagination',
  props: {
    pageNumber: {
      type: Number,
      required: true
    },
    itemsTotal: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      required: true
    }
  },
  emits: ['page-opened'],
  setup(props, { emit }) {
    return {
      pageCount: computed(() => Math.ceil(props.itemsTotal / props.pageSize)),
      pageChanged(pageNumber: number) {
        emit('page-opened', pageNumber)
      }
    }
  }
})
</script>
