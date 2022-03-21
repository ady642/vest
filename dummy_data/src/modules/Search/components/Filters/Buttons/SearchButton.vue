<template>
  <mp-button type="primary" @click="$emit('clicked')">{{
    $t('ged.common.search')
  }}</mp-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SearchButton',
  emits: ['clicked']
})
</script>
