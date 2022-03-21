<template>
  <MpButton
    class="secondary-cta-btn"
    size="small"
    btn-type="default"
    :disabled="disabled"
    @click="$emit('click')"
  >
    {{ $t('ged.upload.uploadModal.uploadAll') }}{{ ` “${folderName}”` }}
  </MpButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SecondaryCtaButton',
  props: {
    folderName: {
      type: String,
      required: true
    },
    disabled: Boolean
  },
  emits: ['click']
})
</script>

<style lang="scss" scoped>
.secondary-cta-btn {
  justify-content: center;
  align-items: center;
  display: flex;
}
</style>
