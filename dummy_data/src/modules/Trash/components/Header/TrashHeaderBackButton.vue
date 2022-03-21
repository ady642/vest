<template>
  <go-back-button />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GoBackButton from '@/Common/components/Header/GoBackButton.vue'

export default defineComponent({
  name: 'TrashHeaderBackButton',
  components: { GoBackButton }
})
</script>
