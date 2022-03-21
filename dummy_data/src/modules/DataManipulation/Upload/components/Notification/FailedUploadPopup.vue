<template>
  <div class="failed-container">
    <div class="icon-zone"><warning-icon /></div>
    <div class="main-content-zone">
      <p class="description">Import fini</p>
      <p class="sub-description">{{ description }}</p>
    </div>
    <div class="actions-zone">
      <mp-button
        class="open-upload-modal-cta"
        size="small"
        btn-type="primary"
        @click="openModal"
      >
        {{ labelBtn }}
      </mp-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import WarningIcon from '@/Common/components/Icons/WarningIcon.vue'
import { useTranslation } from '@/Common/hooks/useTranslation'
export default defineComponent({
  name: 'FailedUploadPopup',
  emits: ['openUploadModal'],
  components: {
    WarningIcon
  },
  props: {
    canceled: Number,
    errored: Number,
    successed: Number
  },
  setup(props, { emit }) {
    const { tc } = useTranslation()

    const isPlural = (count: number | undefined) => {
      return (count ?? 0) > 1 ? 's' : ''
    }
    // 1 fichier déposé, 2 fichiers en erreur, 6 fichiers abandonnés
    let descriptions: string[] = []

    if (props.successed !== 0)
      descriptions.push(
        `${props.successed} fichier${isPlural(
          props.successed
        )} déposé${isPlural(props.successed)} correctement`
      )
    if (props.errored !== 0)
      descriptions.push(
        `${props.errored} fichier${isPlural(props.errored)} en erreur`
      )

    if (props.canceled !== 0)
      descriptions.push(
        `${props.canceled} fichier${isPlural(
          props.canceled
        )} abandonné${isPlural(props.canceled)}`
      )

    let description = descriptions[0]

    if (descriptions.length === 3) {
      description = description.concat(', ', descriptions[1])
    }

    if (descriptions.length !== 1) {
      description = description.concat(
        ' et ',
        descriptions[descriptions.length - 1]
      )
    }

    const labelBtn = computed(() =>
      tc('ged.dataManipulation.upload.notification.failUploadPopup.btn')
    )

    return {
      openModal: () => emit('openUploadModal'),
      labelBtn,
      description
    }
  }
})
</script>

//
<style lang="scss">
.failed-container {
  display: grid;
  align-items: center;
  padding: 16px;
  background: #fce4e9;

  .primary {
    color: #4e50f5;
  }

  grid-template-columns: 7% 80% 18% !important;

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
    .open-upload-modal-cta {
      background: white;
      padding: 8px 12px;
      color: var(--primary);
      font-size: 14px;
      line-height: 20px;
      font-weight: 700;
      border-radius: 8px;
      cursor: pointer;
    }
  }
}
</style>
