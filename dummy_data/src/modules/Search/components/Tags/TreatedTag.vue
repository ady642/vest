<template>
  <natto-tag>
    <div :class="$attrs.class" class="document-treated-tag__content">
      <check-icon class="document-treated-tag__icon" />
      <span class="document-treated-tag__text"
        >{{ $t('ged.search.document.treated') }}
      </span>
    </div>
  </natto-tag>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NattoTag from '@/Common/components/Tags/NattoTag.vue'
import CheckIcon from '@/Common/components/Icons/CheckIcon.vue'

export default defineComponent({
  name: 'TreatedTag',
  components: { CheckIcon, NattoTag }
})
</script>

<style lang="scss" scoped>
.document-treated-tag {
  &__content {
    display: flex;
    align-items: center;
    color: var(--grey-800);
    font-weight: 600;
  }

  &__text {
    margin-left: 7px;
  }

  &__icon {
    font-size: 18px;
  }
}
</style>
