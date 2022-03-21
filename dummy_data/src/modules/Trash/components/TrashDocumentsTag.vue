<template>
  <natto-tag :closable="closable">
    {{ text }}
  </natto-tag>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NattoTag from '@/Common/components/Tags/NattoTag.vue'

export default defineComponent({
  name: 'TrashDocumentsTag',
  components: {
    NattoTag
  },

  props: {
    text: String,
    closable: Boolean
  }
})
</script>
