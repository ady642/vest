<template>
  <el-dialog
    v-model="isOpened"
    :show-close="true"
    append-to-body
    custom-class="mailToGed-dialog-container"
  >
    <template #title class="natto-dialog-title">
      <span class="title-mailToGed">{{
        $tc('ged.dataManipulation.mailToGed.Modal.title')
      }}</span>
      <span class="description-mailToGedd">{{
        $tc('ged.dataManipulation.mailToGed.Modal.description')
      }}</span>
    </template>
    <loading-icon class="mail-to-ged-loading" v-if="mailToGedInfos.isLoading" />
    <mail-to-ged-line
      v-else
      v-for="(item, index) in mailToGedInfos.items"
      :key="index"
      :folderName="item.label"
      :folderEmail="item.emailAddress"
      :class="index < mailToGedInfos.items.length - 1 ? 'spacer' : ''"
    />
    <template #footer class="mailToGed-dialog-footer">
      <div
        class="more-info"
        @click="$emit('more-info', mailToGedInfos.moreInformationLink)"
      />
      <mp-button
        class="close-modal-btn"
        size="small"
        btn-type="primary"
        @click="closeModal"
      >
        {{ $tc('ged.dataManipulation.mailToGed.Modal.buttons.close') }}
      </mp-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MailToGedLine from '@/modules/DataManipulation/MailToGed/components/Elements/MailToGedLine.vue'
import useVModel from '@/Common/hooks'
import { MailToGedInformations } from '@/modules/DataManipulation/MailToGed/models/MailToGedInformations'
import LoadingIcon from '@/Common/components/Icons/LoadingIcon.vue'

export default defineComponent({
  name: 'MailToGedModal',
  emits: ['more-info', 'close'],
  components: {
    MailToGedLine,
    LoadingIcon
  },
  props: {
    mailToGedInfos: MailToGedInformations
  },
  setup(props, { emit }) {
    const isOpened = useVModel(props)

    return {
      isOpened,
      closeModal: () => emit('close')
    }
  }
})
</script>

<style lang="scss">
.mailToGed-dialog-container {
  max-width: 800px;
  .mail-to-ged-loading {
    width: 100%;
  }
  .el-icon-close {
    color: #5446ff;
  }
  .spacer {
    border-bottom: 1px solid #ebeef5;
  }
  .el-dialog__header {
    display: flex;
    flex-direction: column;
  }
  .title-mailToGed {
    font-size: 18px;
    line-height: 24px;
    font-weight: bold;
    margin-bottom: 8px;
    color: var(--black);
  }
  .description-mailToGedd {
    font-size: 14px;
    line-height: 20px;
    font-weight: normal;
    color: var(--black);
  }
  .el-dialog__footer {
    display: grid;
    grid-template-columns: 80% 20%;
    align-items: center;
    .close-modal-btn {
      border-radius: 8px;
      position: relative;
      right: 20px;
    }
    .more-info {
      cursor: pointer;
      font-weight: 600;
      font-size: 10px;
      line-height: 16px;
      color: #5446ff;
      text-decoration: underline;
      display: flex;
      flex: 1;
      justify-content: flex-start;
      padding-left: 20px;
    }
  }
}
</style>
