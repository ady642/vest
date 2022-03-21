<template>
  <img class="ged-upload-picto" :src="WaitSvg" alt="wait-picto" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WaitSvg from '@/assets/Upload/Wait.svg'

export default defineComponent({
  name: 'WaitPicto',

  setup() {
    return {
      WaitSvg
    }
  }
})
</script>
