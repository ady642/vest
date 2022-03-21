<template>
  <natto-tag>
    <div :class="$attrs.class" class="document-certify-tag__content">
      <certify-icon />
      <span class="document-certify-tag__text"
        >{{ $t('ged.search.document.certified') }}
      </span>
    </div>
  </natto-tag>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NattoTag from '@/Common/components/Tags/NattoTag.vue'
import CertifyIcon from '@/Common/components/Icons/CertifyIcon.vue'

export default defineComponent({
  name: 'DocumentCertifyTag',
  components: { CertifyIcon, NattoTag }
})
</script>

<style lang="scss" scoped>
.document-certify-tag {
  &__content {
    display: flex;
    align-items: center;
    color: var(--grey-800);
    font-weight: 600;
  }

  &__text {
    margin-left: 7px;
  }
}
</style>
