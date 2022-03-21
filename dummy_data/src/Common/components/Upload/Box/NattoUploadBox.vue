<template>
  <div :class="$attrs.class" class="natto-upload-box-container">
    <div class="upload-box-main">
      <natto-drop-zone :disabled="disabled" @files-changes="onFilesChange">
        <div
          class="upload-box-inner"
          @click="!disabled ? $refs.uploadInput.click() : false"
        >
          <input
            type="file"
            ref="uploadInput"
            class="uploadInput"
            style="display: none"
            @change="handleDragZoneClick"
            multiple
          />
          <div class="upload-box-icon-zone">
            <upload-box-icon v-if="!disabled" />
            <wait-icon v-else />
          </div>
          <div class="upload-box-content-zone">
            <div class="title">{{ boxInnerText.mainText.text }}</div>
            <div class="subText">{{ boxInnerText.subText }}</div>
          </div>
        </div>
      </natto-drop-zone>
    </div>
  </div>
</template>

<script lang="ts">
import UploadBoxIcon from '@/Common/components/Icons/UploadBoxIcon.vue'
import WaitIcon from '@/Common/components/Icons/WaitIcon.vue'
import NattoDropZone from '@/Common/components/Upload/NattoDropZone.vue'
import { computed, defineComponent, PropType, ref } from 'vue'
import { useTranslation } from '@/Common/hooks/useTranslation'

export default defineComponent({
  name: 'NattoUploadBox',
  components: { UploadBoxIcon, WaitIcon, NattoDropZone },
  emits: ['on-files-change'],
  props: {
    supportedTypes: {
      type: Array as PropType<string[]>,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const { tc } = useTranslation()
    const uploadInput = ref(null as any)
    const authorizedTypes = computed(() =>
      props.supportedTypes.reduce((accumulator, currentValue) =>
        accumulator.concat(', ', currentValue)
      )
    )
    const onFilesChange = (files: File[]) => {
      emit('on-files-change', files)
      if (uploadInput.value?.value) {
        uploadInput.value.value = ''
      }
    }

    return {
      uploadInput,
      onFilesChange: (data: File[]) => {
        onFilesChange(data)
      },
      handleDragZoneClick: (event: any) => {
        onFilesChange(Array.from(event.target.files))
      },
      boxInnerText: computed(() => {
        return !props.disabled
          ? {
              mainText: {
                text: tc('ged.dataManipulation.upload.box.uploadBox.title')
              },
              subText:
                tc('ged.dataManipulation.upload.box.uploadBox.subText') +
                authorizedTypes.value
            }
          : {
              mainText: {
                text: tc(
                  'ged.dataManipulation.upload.box.uploadBox.disabled.title'
                )
              },
              subText: tc(
                'ged.dataManipulation.upload.box.uploadBox.disabled.subtitle'
              )
            }
      }),
      authorizedTypes
    }
  }
})
</script>

<style lang="scss">
.natto-upload-box-container {
  .upload-box-main {
    padding: 24px;
    background: white;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    .upload-box-inner {
      cursor: pointer;
      padding: 20px;
      border-radius: 8px;
      border: 1px dashed #dfe2e9;
      min-width: 255px;
      .upload-box-icon-zone {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 129px;
        }
      }
      .upload-box-content-zone {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-top: 5%;
        .title {
          color: var(--grey-900);
          font-weight: bold;
          font-size: 14px;
        }
        .subText {
          color: var(--grey-500);
          font-size: 12px;
        }
      }
    }
  }
}
</style>
