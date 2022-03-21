<template>
  <natto-primary-cta :action="action" :disabled="disabled" />
</template>

<script lang="ts">
import NattoPrimaryCta from '@/Common/components/Buttons/NattoPrimaryCta.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'DocumentPrimaryCta',
  components: { NattoPrimaryCta },
  props: {
    disabled: Boolean,
    action: String
  }
})
</script>
