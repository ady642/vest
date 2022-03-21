<template>
  <div class="restore-success-container">
    <div class="icon-zone"><i class="mp-icon-check"></i></div>
    <div class="main-content-zone">
      <p class="description">
        {{ successText }}
      </p>
      <p class="sub-description">{{ fileName }}</p>
    </div>
    <div class="actions-zone">
      <mp-button
        v-if="successed == 1"
        class="go-to-destination-cta"
        size="small"
        btn-type="primary"
        @click="redirectToLocation"
      >
        {{ goToBtn }}
      </mp-button>
      <i v-else class="mp-icon-close"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useTranslation } from '@/Common/hooks/useTranslation'

export default defineComponent({
  name: 'SuccessPopup',
  emits: ['redirect-to-location'],
  props: {
    successed: { type: Number, required: true },
    fileName: String
  },
  setup(props, { emit }) {
    const { t } = useTranslation()

    const successText = computed(() =>
      t('ged.trash.restore.successPopup.restored')
    )

    const goToBtn = computed(() => t('ged.trash.restore.successPopup.goToBtn'))

    return {
      successText,
      goToBtn,
      redirectToLocation: () => emit('redirect-to-location')
    }
  }
})
</script>

<style lang="scss">
.restore-success-container {
  display: grid;
  align-items: center;
  padding: 16px;
  background: #e8f5e6;

  .primary {
    color: var(--primary);
  }

  grid-template-columns: 8% 54% 40% !important;

  .icon-zone {
    i {
      font-size: 24px;
      color: var(--success);
    }
  }

  .main-content-zone {
    .sub-description {
      font-weight: 600;
      line-height: 16px;
      color: var(--grey-500);
      width: 90%;
      word-break: break-word;
    }
  }

  .actions-zone {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .go-to-destination-cta {
      background: white;
      padding: 8px 12px;
      color: var(--primary);
      font-size: 14px;
      line-height: 20px;
      font-weight: 700;
      border-radius: 8px;
      cursor: pointer;
    }

    .close-icon {
      color: var(--success);
    }
  }
}
</style>
