<template>
  <div class="header-back">
    <mp-icon name="arrow-left" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'GoBackButton'
})
</script>

<style lang="scss" scoped>
.header-back {
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-color: white;
  color: var(--primary);
  font-size: 16px;
  box-shadow: 0 12px 28px rgba(87, 94, 107, 0.08);

  &-icon {
    font-weight: 800;
    cursor: pointer;
  }
}
</style>
