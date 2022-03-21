<template>
  <div class="arbo-card__title">
    <folder-icon class="arbo-card__title--icon" />
    <span class="arbo-card__title--text">
      {{ title }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FolderIcon from '@/Common/components/Icons/FolderIcon.vue'

export default defineComponent({
  name: 'ArboCardTitle',
  components: { FolderIcon },
  props: {
    title: {
      type: String,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.arbo-card__title {
  display: flex;
  align-items: center;

  &--text {
    margin-left: 10px;
    font-weight: bold;
    font-size: 18px;
    color: var(--black);
  }

  &--icon {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: var(--background-base);
    color: var(--primary);
    height: 32px;
    width: 32px;
  }
}
</style>
