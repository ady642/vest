<template>
  <el-dialog
    v-model="isOpened"
    :close-on-click-modal="!loading"
    :close-on-press-escape="!loading"
    :show-close="!loading"
    @close="clickHandle('cancel')"
    append-to-body
    custom-class="natto-dialog-container"
  >
    <template #title class="natto-dialog-title">
      <span :class="'title-' + popupType">{{ title }}</span>
    </template>

    <p class="description">{{ description }}</p>
    <template #footer class="natto-dialog-footer">
      <el-button
        :loading="loading"
        class="btn btn-cancel"
        @click="clickHandle('cancel')"
        >Annuler</el-button
      >

      <el-button
        :loading="loading"
        :class="'btn btn-' + popupType"
        @click="clickHandle('confirm')"
        >Continuer</el-button
      >
    </template>
    <natto-collapse-transition>
      <span class="error-message" v-if="errorMessage">{{ errorMessage }}</span>
    </natto-collapse-transition>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useVModel from '@/Common/hooks'
import NattoCollapseTransition from '@/Common/components/Transitions/NattoCollapseTransition.vue'

export default defineComponent({
  name: 'NattoDialogPopup',
  components: { NattoCollapseTransition },
  props: {
    modelValue: Boolean,
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    popupType: {
      type: String,
      required: true,
      validator(value: string) {
        return ['error'].includes(value)
      }
    },
    loading: {
      type: Boolean
    },
    errorMessage: String
  },
  emits: ['confirm-clicked', 'cancel-clicked'],
  setup(props, { emit }) {
    const isOpened = useVModel(props)

    const clickHandle = (type: string) => {
      const eventType = (type + '-clicked') as
        | 'confirm-clicked'
        | 'cancel-clicked'

      emit(eventType)
    }

    return {
      clickHandle,
      isOpened
    }
  }
})
</script>

<style lang="scss">
.natto-dialog-container {
  width: 40% !important;
  padding: 40px;

  .title-error {
    color: #bc204b;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 25px;
  }

  .btn {
    border-radius: 4px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
  }

  .btn-error {
    border: 0;
    background: #bc204b;
    color: #fff;
  }

  .btn-cancel {
    background: #fff;
    color: #6b6e74;
    border: 2px solid #e4ecf9;
  }

  .description {
    word-break: keep-all;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 150%;
    color: #3c3c3b;
  }

  .error-message {
    color: #bc204b;
    font-size: 12px;
  }

  .el-dialog__header {
    padding: 0;
  }

  .el-dialog__body {
    padding: 5px 5px 5px 0;
  }

  .el-dialog__footer {
    padding-right: 0;
    padding-bottom: 0;
  }
}
</style>
