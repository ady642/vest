<template>
  <in-progress-upload-popup
    :loading="loading"
    v-if="displayInProgress"
    :total="total"
    :running="treated"
  />
  <success-upload-popup v-else-if="displaySuccess" :successed="successed" />
  <failed-upload-popup
    v-else
    :canceled="canceled"
    :errored="errored"
    :successed="successed"
  />
</template>

<script lang="ts">
import { defineComponent, computed, PropType, watch } from 'vue'
import InProgressUploadPopup from '@/modules/DataManipulation/Upload/components/Notification/InProgressUploadPopup.vue'
import SuccessUploadPopup from '@/modules/DataManipulation/Upload/components/Notification/SuccessUploadPopup.vue'
import FailedUploadPopup from '@/modules/DataManipulation/Upload/components/Notification/FailedUploadPopup.vue'
import FileUpload from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'

export default defineComponent({
  name: 'MainUploadPopup',
  props: {
    loading: Boolean,
    duration: Number,
    files: Array as PropType<FileUpload[]>
  },
  components: {
    InProgressUploadPopup,
    SuccessUploadPopup,
    FailedUploadPopup
  },
  setup(props, { emit }) {
    watch(
      () => props.files,
      () => {
        if (props.files?.every((f) => f.uploaded())) {
          setTimeout(() => {
            emit('close')
          }, props.duration)
        }
      },
      {
        deep: true
      }
    )

    return {
      displayInProgress: computed(() =>
        props.files?.some((f) => f.running() || f.pending())
      ),
      cancelUploadHandler: () => emit('cancelUpload'),
      displaySuccess: computed(() => props.files?.every((f) => f.uploaded())),
      total: computed(() => props.files?.length),
      treated: computed(() => props.files?.filter((f) => f.finished()).length),
      canceled: computed(() => props.files?.filter((f) => f.canceled()).length),
      errored: computed(() => props.files?.filter((f) => f.error()).length),
      successed: computed(() => props.files?.filter((f) => f.uploaded()).length)
    }
  }
})
</script>

<style lang="scss">
.mfe-upload-main {
  transition: unset !important;
  padding: 0;
  margin: 0;
  border-radius: 16px;

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
    color: var(--danger);
  }

  .el-message-box {
    width: auto;
  }
  .el-message-box__title {
    width: auto;
  }

  .el-message-box__content {
    width: auto;
  }

  .confirm-button {
    color: #fff;
  }
}
</style>
