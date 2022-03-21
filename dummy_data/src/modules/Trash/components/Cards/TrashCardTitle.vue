<template>
  <div class="trash-card__title">
    <delete-icon class="trash-card__title--icon" />
    <span class="trash-card__title--text">
      {{ title }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DeleteIcon from '@/Common/components/Icons/DeleteIcon.vue'

export default defineComponent({
  name: 'TrashCardTitle',
  components: { DeleteIcon },
  props: {
    title: {
      type: String,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.trash-card__title {
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
    color: var(--danger);
    height: 32px;
    width: 32px;
  }
}
</style>
