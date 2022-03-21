<template>
  <div class="upload-texts">
    <span class="upload-texts__title">
      {{ $t(boxInnerText.title) }}
    </span>
    <div class="upload-texts__subtitle">
      {{
        isUploading
          ? $t(boxInnerText.subtitle)
          : `${$t(boxInnerText.subtitle)} ${authorizedTypes}`
      }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import constants from '@/Common/constants'

export default defineComponent({
  name: 'UploadTexts',

  props: {
    isUploading: Boolean
  },

  setup(props) {
    const types = constants.allowedTypes

    const authorizedTypes = computed(() =>
      types.reduce((accumulator, currentValue) =>
        accumulator.concat(', ', currentValue)
      )
    )

    return {
      authorizedTypes,
      boxInnerText: computed(() => {
        return !props.isUploading
          ? {
              title: 'ged.upload.default.title',
              subtitle: 'ged.upload.default.subtitle'
            }
          : {
              title: 'ged.upload.disabled.title',
              subtitle: 'ged.upload.disabled.subtitle'
            }
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.upload-texts {
  text-align: center;

  &__title {
    color: var(--grey-900);
    font-weight: bold;
    font-size: 14px;
  }

  &__subtitle {
    color: var(--grey-500);
    font-size: 12px;
  }
}
</style>
