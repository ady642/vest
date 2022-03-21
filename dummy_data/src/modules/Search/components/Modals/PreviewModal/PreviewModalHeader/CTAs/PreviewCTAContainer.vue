<template>
  <natto-tooltip :content="tooltipContent" placement="bottom">
    <div
      class="preview-cta__container"
      :class="{ disabled }"
      @click="$emit('click')"
    >
      <slot />
    </div>
  </natto-tooltip>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NattoTooltip from '@/Common/components/Tooltips/NattoTooltip.vue'

export default defineComponent({
  name: 'PreviewCTAContainer',
  components: { NattoTooltip },
  props: {
    tooltipContent: String,
    disabled: Boolean
  }
})
</script>

<style lang="scss" scoped>
.preview-cta__container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 16px;
  height: 16px;
  cursor: pointer;
  color: var(--grey-900);
  padding: 10px;
  border-radius: 8px;
  font-size: 18px;
  transition: all ease-in-out 0.3s;

  &.disabled {
    background: var(--grey-50);
  }

  &:hover {
    color: var(--primary);
    font-weight: bold;
    background-color: var(--primary-50);
  }
}
</style>
