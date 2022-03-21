<template>
  <div class="upload-dropdown-container">
    <div class="upload-btn" @click="showModal = !showModal">
      <div class="upload-icon"></div>
    </div>
    <div class="upload-btn-dropdown" v-show="showModal">
      <el-row>
        <el-col :span="24">
          <div class="dropdown-footer">
            <natto-upload-btn
              :isDrag="false"
              :targetInput="'.dropdown-upload-btn input[type=file]'"
              :wrapperClassName="'dropdown-upload-btn'"
              :disabled="disabled"
              @on-files-change="onFilesChange"
            >
              <template #content>
                <mp-button
                  size="small"
                  btn-type="primary"
                  :class="disabled ? 'disabled-btn' : ''"
                  >{{ dropdownButtonText }}</mp-button
                ></template
              >
              <template #buttonSubText>
                {{ dropdownFooterText }}
              </template>
            </natto-upload-btn>
          </div></el-col
        >
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NattoUploadBtn from '@/Common/components/Upload/Buttons/NattoUploadBtn.vue'
import { ref } from 'vue'

export default defineComponent({
  name: 'NattoUploadDropDown',
  components: { NattoUploadBtn },
  emits: ['on-files-change'],
  props: {
    dropdownFooterText: {
      type: String,
      default: 'ou pouvez déposer directement dans la fenétre'
    },
    dropdownButtonText: {
      type: String,
      default: 'Ajouter depuis mon ordinateur'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    closeDropDown: Boolean
  },
  setup(props, { emit }) {
    const showModal = ref(false)

    return {
      showModal,
      onFilesChange: (data: File[]) => {
        showModal.value = false
        emit('on-files-change', data)
      }
    }
  }
})
</script>

<style lang="scss">
.clean {
  width: 100%;
  height: 100px;
}

.upload-dropdown-container {
  position: relative;

  .upload-btn {
    width: 56px;
    height: 56px;
    border-radius: 28px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .upload-icon {
    height: 24px;
    width: 24px;
    background:
      url('../../../../assets/Upload/upload.svg') no-repeat center
      center;
  }

  .upload-btn-dropdown {
    width: 238px;
    max-height: 583px;
    background: white;
    position: absolute;
    border-radius: 16px;
    left: -230px;
    z-index: 999;
    top: 60px;
    padding: 24px;

    &::before {
      position: absolute;
      width: 25px;
      height: 25px;
      z-index: -1;
      content: ' ';
      transform: rotate(-45deg);
      box-sizing: border-box;
      background: white;
      top: -7px;
      right: 49px;
      border-top-right-radius: 3px;
    }
  }

  .dropdown-header {
    height: 40px;

    .title-text {
      font-weight: 600;
      font-size: 12px;
      line-height: 16.34px;
      color: #c0c4cc;
    }
  }

  .dropdown-content {
    max-height: 450px;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .dropdown-footer {
    height: 93px;
    display: flex;
    justify-content: center;
    align-items: flex-end;

    .el-button {
      background-color: #4e50f5;
      border-color: #4e50f5;
      width: 240px;
      height: 37px;
      font-weight: 600;
      line-height: 21px;
      font-size: 14px;
      border-radius: 4px;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .disabled-btn {
      background-color: #c0c4cc;
      border-color: #c0c4cc;
    }
  }

  .dropdown-upload-btn {
    display: flex;
    flex-direction: column;
    align-items: center;

    .el-upload__text {
      position: relative;
      top: 8px;
      font-weight: 700;
      font-size: 12px;
      line-height: 16.34px;
      color: #6b6e74;
      text-align: center;
      width: 83%;
      margin: 0 auto;
    }
  }
}
</style>
