<template>
  <natto-dialog
    v-model="isOpened"
    @close="handleClose"
    custom-class="natto-type-popup-container"
    title="Avant d'allez plus loin..."
  >
    <div class="modal-content-container">
      <p class="question">
        Dans quel répertoire souhaitez-vous déposer vos fichiers ?
      </p>
      <div class="folders">
        <div
          v-for="folder in folders.collection"
          :key="folder.id"
          class="folder-item"
          :class="selectedDefaultFolderId === folder.id ? 'selected' : ''"
          @click="folderItemClick(folder)"
        >
          <div class="folder-icon-container">
            <div :class="`folder-icon ${categoryCode(folder.name)}`"></div>
          </div>
          <div class="folder-name">{{ folder.name }}</div>
        </div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button class="client-cta n-btn nbtn-blue" @click="treatByClient"
          >Je veux trier mes fichiers moi-même</el-button
        >
        <el-button
          class="collab-cta n-btn"
          :class="enableCollabCTA ? 'nbtn-complete' : 'nbtn-grey'"
          @click="treatByCollab"
          >Je laisse mon collaborateur KPMG trier mes fichiers</el-button
        >
      </span>
    </template>
  </natto-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import useVModel from '@/Common/hooks'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import { trackEventFactory } from '@/Common/helpers/analyticsLog'
import analyticsCode from '@/Common/constants/analyticsCode'
import Folder from '@/modules/Search/models/Folders/Inputs/Folder'
import NattoDialog from '@/Common/components/Modals/NattoDialog.vue'

export default defineComponent({
  name: 'NattoUploadTypePopup',
  components: { NattoDialog },
  props: {
    modelValue: { type: Boolean, default: false },
    folders: {
      type: Folders,
      required: true
    }
  },
  emits: [
    'on-treat-by-client',
    'on-treat-by-collab',
    'popup-folder-select-close'
  ],
  setup(props, { emit }) {
    const isOpened = useVModel(props)

    const selectedDefaultFolderId = ref(0)

    const categoryCode = (folderName: string) => {
      return folderName.includes('Comptabilité')
        ? 'compta'
        : folderName.includes('Gestion Sociale')
        ? 'gs'
        : ''
    }

    const folderItemClick = (folder: Folder) => {
      if (folder.properties?.tracingName) {
        trackEventFactory(
          analyticsCode['updm-select-tree-folder'],
          folder.properties.tracingName
        )
      }
      selectedDefaultFolderId.value = folder.id ?? 0
    }

    const treatByClient = () => {
      emit('on-treat-by-client', selectedDefaultFolderId.value)
      selectedDefaultFolderId.value = 0
    }

    const treatByCollab = () => {
      if (selectedDefaultFolderId.value !== 0) {
        emit('on-treat-by-collab', selectedDefaultFolderId.value)
      }
    }

    const handleClose = () => {
      selectedDefaultFolderId.value = 0
      emit('popup-folder-select-close')
    }

    const enableCollabCTA = computed(() => {
      return (
        selectedDefaultFolderId.value !== 0 &&
        props.folders &&
        props.folders.getDefaultUploadFolderById(selectedDefaultFolderId.value)
          ?.id
      )
    })

    return {
      enableCollabCTA,
      isOpened,
      categoryCode,
      folderItemClick,
      treatByClient,
      treatByCollab,
      handleClose,
      selectedDefaultFolderId
    }
  }
})
</script>

<style lang="scss">
.natto-type-popup-container {
  padding: 40px;
  width: 60% !important;
  max-width: 60% !important;

  .el-dialog__header {
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    color: #171717;
    padding: 0;
  }

  .el-dialog__body {
    padding: 0;
  }

  .question {
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
  }

  .folders {
    display: flex;
    gap: 5%;
    justify-content: space-between;
    align-items: center;

    .folder-item {
      width: 100%;
      min-width: 47%;
      height: 84px;
      background: white;
      border: 2px solid #f5f7fa;
      border-radius: 16px;
      display: flex;
      align-items: center;
      cursor: pointer;
      box-shadow: 0 6px 20px 0 #4747470d;

      &.selected {
        background: #f7e5f9;
      }

      .folder-name {
        font-weight: 700;
        font-size: 14px;
        line-height: 20px;
        color: #171717;
      }

      .folder-icon {
        height: 15px;
        width: 13px;
        background-size: contain;
        margin-right: 17.5px;
        margin-left: 17.5px;

        &.compta {
          background: url('../../../assets/Folder/FolderCompta.svg') no-repeat
            center center;
        }

        &.gs {
          background: url('../../../assets/Folder/FolderGS.svg') no-repeat
            center center;
        }
      }
    }
  }

  .n-btn {
    min-width: 199px;
    height: 41px;
    border-radius: 8px;
    padding: 10px 16px 11px 16px;
    border: 2px solid;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    text-align: center;

    &.nbtn-blue {
      border-color: #4e50f5;
      color: #4e50f5;
      background: white;

      &:hover {
        border-color: #4e50f5;
        color: #4e50f5;
        background: white;
      }
    }

    &.nbtn-grey {
      border-color: #c0c4cc;
      color: white;
      background: #c0c4cc;
      text-align: center;

      &:hover {
        border-color: #c0c4cc;
        color: white;
        background: #c0c4cc;
        text-align: center;
      }
    }

    &.nbtn-complete {
      border-color: #4e50f5;
      color: #fff;
      background: #4e50f5;
    }
  }

  .el-dialog__footer {
    padding: 0;
    padding-top: 32px;
  }
}
</style>
