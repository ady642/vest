<template>
  <natto-tag>
    <div :class="$attrs.class" class="document-new-tag__content">
      <favorite-icon class="document-new-tag__icon" />
      <span class="document-new-tag__text"
        >{{ $t('ged.search.document.new') }}
      </span>
    </div>
  </natto-tag>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NattoTag from '@/Common/components/Tags/NattoTag.vue'
import FavoriteIcon from '@/Common/components/Icons/FavoriteIcon.vue'

export default defineComponent({
  name: 'NewTag',
  components: { FavoriteIcon, NattoTag }
})
</script>

<style lang="scss" scoped>
.document-new-tag {
  &__content {
    display: flex;
    align-items: center;
    color: var(--grey-800);
    font-weight: 600;
  }

  &__text {
    margin-left: 7px;
    padding-top: 2px;
  }

  &__icon {
    font-size: 18px;
  }
}
</style>
