<template>
  <mp-button :type="'secondary'" @click="$emit('clicked')">
    {{ $t('ged.common.reset') }}
  </mp-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ResetSearchButton',
  emits: ['clicked']
})
</script>
