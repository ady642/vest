<template>
  <in-progress-popup
    v-if="displayInProgress"
    :running="totalPending"
    @cancelRestore="cancelRestoreHandler"
  />
  <success-popup
    v-else-if="displaySuccess"
    :successed="1"
    :fileName="restoredDocument.name"
    @close="handleClosePopup"
    @redirect-to-location="handleRedirection"
  />
  <failed-popup v-if="displayFailed" @close="handleClosePopup" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

import { trackEventFactory } from '@/Common/helpers/analyticsLog'
import constants from '@/Common/constants'
import analyticsCode from '@/Common/constants/analyticsCode'

import TrashDocument from '@/modules/Trash/models/Inputs/TrashDocument'
import TrashDocuments from '@/modules/Trash/models/Inputs/TrashDocuments'
import SuccessPopup from '@/modules/Trash/components/Notification/Elements/SuccessPopup.vue'
import FailedPopup from '@/modules/Trash/components/Notification/Elements/FailedPopup.vue'
import InProgressPopup from '@/modules/Trash/components/Notification/Elements/InProgressPopup.vue'
import useTrashModule from '@/modules/Trash/store/helpers'

export default defineComponent({
  name: 'TrashViewRestorePopup',

  emits: ['close', 'redirect-to-location', 'cancelRestore'],

  props: {
    duration: Number,
    pending: Boolean,
    success: Boolean,
    failed: Boolean,
    documents: {
      type: TrashDocuments,
      required: true
    },
    restoredDocument: TrashDocument
  },

  components: {
    SuccessPopup,
    FailedPopup,
    InProgressPopup
  },

  setup(props, { emit }) {
    const store = useStore()

    const { totalPendingRestoration } = useTrashModule(store)

    setTimeout(() => {
      emit('close')
    }, props.duration)

    const handleRedirection = () => {
      trackEventFactory(analyticsCode['tdv-notification-restore-cta'])
      emit('redirect-to-location')
    }

    return {
      totalPending: computed(
        () =>
          props.documents.collection.filter(
            (doc) => doc.restorationStatus === constants.RESTORE_IN_PROGRESS
          ).length
      ),
      displayInProgress: computed(() => !props.success && props.pending),
      displaySuccess: props.success,
      displayFailed: computed(() => props.failed),
      cancelRestoreHandler: () => emit('cancelRestore'),
      handleClosePopup: () => emit('close'),
      handleRedirection,
      totalPendingRestoration: totalPendingRestoration()
    }
  }
})
</script>

<style lang="scss">
.mfe-restore-main {
  transition: unset !important;
  padding: 0;
  margin: 0;
  border-radius: 16px;
  width: 494px;

  .description {
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
  }

  .el-notification__group {
    padding: 0;
    margin: 0;
    width: inherit;
  }
}

.warning-ged-confirm {
  width: 35%;

  .el-message-box__title {
    color: #bc204b;
  }

  .confirm-button {
    color: #fff;
  }
}
</style>
