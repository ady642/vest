<template>
  <div class="in-progress-restore-container">
    <div class="icon-zone"><restore-icon-blue /></div>
    <div class="main-content-zone">
      <p class="description">
        <span class="primary">{{ running }}</span>
        {{ inProgressText }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import RestoreIconBlue from '@/Common/components/Icons/RestoreIconBlue.vue'
import { useTranslation } from '@/Common/hooks/useTranslation'

export default defineComponent({
  name: 'InProgressPopup',
  emits: ['cancelRestore'],
  components: {
    RestoreIconBlue
  },
  props: {
    total: Number,
    running: Number
  },

  setup(props, { emit }) {
    const { tc } = useTranslation()

    const inProgressText = computed(() =>
      tc('ged.trash.restore.inProgressPopup.content', props.running, {
        count: props.running
      })
    )

    return {
      cancelHandler: () => emit('cancelRestore'),
      inProgressText
    }
  }
})
</script>

<style lang="scss">
.in-progress-restore-container {
  .primary {
    color: var(--primary);
  }

  margin: 0;
  display: grid;
  grid-template-columns: 10% 65% 20%;
  align-items: center;
  padding: 16px;

  .main-content-zone {
    display: flex;
    flex-direction: column;
    padding-left: 5px;

    progress {
      width: 90%;
      height: 4px;
      background-color: var(--primary);
    }

    progress::-webkit-progress-bar {
      background-color: var(--grey-100);
      border-radius: 100px;
    }

    progress::-webkit-progress-value {
      background-color: var(--primary);
      border-radius: 100px;
    }

    progress::-moz-progress-bar {
      background-color: var(--grey-100);
      border-radius: 100px;
    }

    progress::-moz-progress-value {
      background-color: var(--primary);
      border-radius: 100px;
    }

    .description {
      font-weight: 700;
      font-size: 14px;
      line-height: 20px;
      margin-bottom: 5px;
    }
  }

  .actions-zone {
    cursor: pointer !important;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .holder {
      margin: auto !important;
    }

    .cancel-action {
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 20px;
      letter-spacing: 0;
      text-align: center;
      color: var(--primary);
      border: none;
      background: transparent;
      cursor: pointer;
    }
  }
}
</style>
