<template>
  <natto-button class="cancel" :disabled="disabled"
    >{{ $t('ged.dataManipulation.label.cancel') }}
  </natto-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NattoButton from '@/Common/components/Buttons/NattoButton.vue'

export default defineComponent({
  name: 'CancelButton',
  components: { NattoButton },
  props: {
    disabled: Boolean
  }
})
</script>

<style lang="scss" scoped>
.cancel {
  background: white;
  border-color: var(--primary);
  color: var(--primary);
}
</style>
