<template>
  <span> {{ formattedDate }} </span>
</template>

<script>
import { computed, defineComponent } from 'vue'
import useDates from '@/Common/hooks/useDates'

export default defineComponent({
  name: 'NattoDate',

  props: {
    date: {
      type: String,
      required: true
    },
    format: {
      type: String,
      default: 'DD MMMM YYYY'
    }
  },

  setup(props) {
    const { format } = useDates()
    const formattedDate = computed(() => format(props.date, props.format))

    return {
      formattedDate
    }
  }
})
</script>
