<template>
  <div class="restore-failed-container">
    <div class="icon-zone"><warning-icon /></div>
    <div class="main-content-zone">
      <p class="description">{{ FailedMessageTitle }}</p>
      <p class="sub-description">
        {{ FailedMessage }}
      </p>
    </div>
    <div class="actions-zone">
      <i class="el-icon-circle-close close-icon" @click="closeHandler"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WarningIcon from '@/Common/components/Icons/WarningIcon.vue'
import { useTranslation } from '@/Common/hooks/useTranslation'

export default defineComponent({
  name: 'FailedPopup',
  components: {
    WarningIcon
  },
  props: {
    canceled: Number,
    errored: Number
  },
  setup(props, { emit }) {
    const { tc } = useTranslation()

    const FailedMessage = tc('ged.trash.restore.failedPopup.content')

    const FailedMessageTitle = tc('ged.trash.restore.failedPopup.title')

    return {
      FailedMessage,
      FailedMessageTitle,
      closeHandler: () => emit('close')
    }
  }
})
</script>

//
<style lang="scss">
.restore-failed-container {
  display: grid;
  align-items: center;
  padding: 16px;
  background: #fce4e9;

  .primary {
    color: #4e50f5;
  }

  grid-template-columns: 10% 84% 10% !important;

  .icon-zone {
    .natto-state-icon {
      width: unset;
      height: unset;
      padding: 0;
      background: unset;
      justify-content: flex-start;
    }
  }

  .main-content-zone {
    .sub-description {
      font-weight: 600;
      line-height: 16px;
      color: #6b6e74;
      width: 95%;
    }
  }

  .actions-zone {
    .close-icon {
      color: #bc204b;
      cursor: pointer;
    }
  }
}
</style>
