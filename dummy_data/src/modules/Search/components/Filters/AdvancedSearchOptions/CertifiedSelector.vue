<template>
  <div class="certified-selector__container">
    <span class="certified-selector__title">{{
      $t('ged.common.documentType')
    }}</span>
    <natto-radio-group
      v-model="certified"
      :radio-items="certifiedSelectorItems"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NattoRadioGroup, {
  RadioItem
} from '@/Common/components/Radio/NattoRadioGroup.vue'
import { useTranslation } from '@/Common/hooks/useTranslation'
import useVModel from '@/Common/hooks'

export default defineComponent({
  name: 'CertifiedSelector',
  components: { NattoRadioGroup },

  props: {
    modelValue: {
      type: [String, Number],
      required: true
    }
  },

  setup(props) {
    const certified = useVModel(props)
    const { t } = useTranslation()

    const certifiedSelectorItems: RadioItem[] = [
      {
        value: 'all',
        label: t('ged.search.filters.certified.all')
      },
      {
        value: true,
        label: t('ged.search.filters.certified.onlyCertified')
      },
      {
        value: false,
        label: t('ged.search.filters.certified.excludeCertified')
      }
    ]

    return {
      certifiedSelectorItems,
      certified
    }
  }
})
</script>

<style lang="scss" scoped>
.certified-selector {
  &__container {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    margin-top: 15px;
  }

  &__title {
    font-size: clamp(12px, 1vw, 16px);
    font-weight: 600;
    color: var(--grey-500);
  }
}
</style>
