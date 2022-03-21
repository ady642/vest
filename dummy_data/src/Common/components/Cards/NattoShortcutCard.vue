<template>
  <natto-card class="natto-shortcut-card" :class="type">
    <div class="natto-shortcut-card__content">
      <div class="natto-shortcut-card__prepend-icon">
        <mp-icon :name="prependIcon" />
      </div>
      <span
        v-loading="loading"
        element-loading-background="#fce4e9"
        class="natto-shortcut-card__text"
        >{{ text }}
      </span>
      <arrow-right-icon class="natto-shortcut-card__arrow-right" />
    </div>
  </natto-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ArrowRightIcon from '@/Common/components/Icons/ArrowRightIcon.vue'
import NattoCard from '@/Common/components/Cards/NattoCard.vue'

export default defineComponent({
  name: 'NattoShortcutCard',
  components: { NattoCard, ArrowRightIcon },
  props: {
    text: String,
    prependIcon: String,
    loading: Boolean,
    type: {
      type: String,
      validator: (type: string) =>
        ['primary', 'secondary', 'danger'].includes(type),
      default: 'primary'
    }
  }
})
</script>

<style lang="scss" scoped>
.natto-shortcut-card {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  height: clamp(30px, 3.85vh, 40px);

  &.primary {
    color: var(--black);

    :hover {
      color: var(--primary);
    }
  }

  &.secondary {
    color: var(--primary);
    background-color: var(--primary-50);
  }

  &.danger {
    color: var(--danger);
    background-color: var(--danger-50);
  }

  &__prepend-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: bold;
    margin-right: 12px;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  &__text {
    flex-basis: 74%;
  }

  &__arrow-right {
    font-size: 22px;
  }
}
</style>

<style lang="scss">
.natto-shortcut-card {
  .el-card__body {
    width: 100%;
  }
}
</style>
