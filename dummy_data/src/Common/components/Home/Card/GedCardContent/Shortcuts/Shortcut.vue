<template>
  <natto-shortcut-card
    class="shortcut"
    :text="folderName"
    prepend-icon="documents"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NattoShortcutCard from '@/Common/components/Cards/NattoShortcutCard.vue'

export default defineComponent({
  name: 'Shortcut',
  components: { NattoShortcutCard },
  props: {
    folderName: {
      type: String,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.shortcut {
  margin-bottom: 24px;
}
</style>
