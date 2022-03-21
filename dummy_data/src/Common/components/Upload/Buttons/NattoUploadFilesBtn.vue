<template>
  <div class="natto-upload-files-btn-container" v-if="showUploadBtn">
    <natto-upload-btn
      :isDrag="false"
      targetInput=".dropdown-upload-btn input[type=file]"
      wrapperClassName="dropdown-upload-btn"
      :disabled="btnDisabled"
      @on-files-change="onFilesChange"
    >
      <template #content>
        <MpButton size="small" type="primary" :disabled="btnDisabled">
          <natto-icon :elementName="icon" />
          <span class="btn-text">{{ buttoninnerText }}</span>
        </MpButton>
      </template>
    </natto-upload-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import NattoIcon from '@/Common/components/Icons/NattoIcon.vue'
import NattoUploadBtn from '@/Common/components/Upload/Buttons/NattoUploadBtn.vue'

export default defineComponent({
  name: 'NattoUploadFilesBtn',
  components: { NattoUploadBtn, NattoIcon },
  emits: ['on-files-change'],
  props: {
    icon: {
      type: String,
      default: 'plus'
    },
    buttoninnerText: {
      type: String,
      default: 'Ajouter des documents'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    canUploadFiles: Boolean,
    hasAccessDs: Boolean,
    isMainViewBtn: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const btnDisabled = computed(() => {
      return props.isMainViewBtn
        ? props.disabled
        : props.disabled || !props.canUploadFiles || !props.hasAccessDs
    })

    return {
      btnDisabled,
      showUploadBtn: computed(() => {
        if (props.isMainViewBtn) {
          return props.hasAccessDs
        }

        return true
      }),
      onFilesChange: (data: File[]) => {
        if (btnDisabled.value == false) {
          emit('on-files-change', data)
        }
      }
    }
  }
})
</script>

<style lang="scss">
.natto-upload-files-btn-container {
  .mp-button {
    border-radius: 28px;
    padding: 16px 24px;
    height: 56px;
  }

  .el-button.mp-button span {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn-text {
    margin-left: 10px;
  }
}
</style>
