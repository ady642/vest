<template>
  <natto-button
    class="save"
    native-type="submit"
    :loading="loading"
    :disabled="disabled"
    >{{ $t('ged.dataManipulation.label.create') }}
  </natto-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NattoButton from '@/Common/components/Buttons/NattoButton.vue'

export default defineComponent({
  name: 'SaveButton',
  components: { NattoButton },
  props: {
    loading: Boolean,
    disabled: Boolean
  }
})
</script>

<style lang="scss" scoped>
.save {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}
</style>
