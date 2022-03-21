<template>
  <natto-date
    class="document-creation-date__item"
    :date="creationDate"
    format="DD MMMM YYYY"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NattoDate from '@/Common/components/Dates/NattoDate.vue'

export default defineComponent({
  name: 'DocumentCreationDateItem',
  components: { NattoDate },
  props: {
    creationDate: {
      type: String,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.document-creation-date__item {
  font-weight: 600;
}
</style>
