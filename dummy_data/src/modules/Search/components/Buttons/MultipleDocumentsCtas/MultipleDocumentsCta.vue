<template>
  <natto-button class="multiple-documents-cta" :disabled="disabled">
    <div class="multiple-documents-cta__content">
      <slot name="prepend-icon" />
      <span class="multiple-documents-cta__text">
        {{ text }}
      </span>
    </div>
  </natto-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NattoButton from '@/Common/components/Buttons/NattoButton.vue'

export default defineComponent({
  name: 'MultipleDocumentsCta',
  components: { NattoButton },
  props: {
    text: {
      type: String,
      required: true
    },
    disabled: Boolean
  }
})
</script>

<style lang="scss" scoped>
.multiple-documents-cta {
  border: none;
  color: var(--primary);
  font-weight: bold;
  border-radius: 8px;
  background-color: white;

  &:hover {
    background-color: var(--background-base);
  }

  &__content {
    display: flex;
    align-items: center;

    span:first-child {
      font-size: 16px;
    }
  }

  &__text {
    margin-left: 10px;
  }
}
</style>
