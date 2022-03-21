<template>
  <modal-two-columns v-model="isOpened">
    <template #modal-header>
      <div class="header-container">
        <div class="main-section">
          <p class="main-text">
            <span class="highlighted">De nouveaux</span>
            fichiers vont être déposés
          </p>
        </div>
      </div>
    </template>
    <template #modal-subheader>
      <div class="info-section">
        <p>
          Il vous est possible de choisir votre dossier de destination et ainsi
          rendre votre GED plus harmonieuse
        </p>
      </div>
    </template>
    <template #modal-leftpanel-title>Vos fichiers</template>
    <template #modal-leftpanel-content>
      <upload-file-list
        :files="files"
        :selectedFileIndex="selectedFileIndex"
        @display-file="$emit('display-file', $event)"
      />
    </template>
    <template #modal-rightpanel-title>
      <span
        v-if="files[selectedFileIndex ? selectedFileIndex : 0]?.error()"
        class="fileSelectedError"
      >
        {{ $t('ged.upload.uploadModal.error') }}</span
      >
      <span
        class="fileSelectedError"
        v-else-if="files[selectedFileIndex ? selectedFileIndex : 0]?.canceled()"
      >
        {{ $t('ged.upload.uploadModal.cancelError') }}
      </span>
      <span v-else> {{ $t('ged.upload.uploadModal.success') }} </span>
    </template>
    <template #modal-rightpanel-content>
      <div class="right-content-container">
        <upload-file-infos
          :triggerUploadAllFiles="triggerUploadAllFiles"
          :selected-folder-to-upload="selectedFolderToUpload"
          :disabledCategories="disableCategoryChange"
          :file="files[selectedFileIndex]"
          :canUpload="canUpload"
          @update:selectedFolderToUpload="
            $emit('change-selected-folderId', $event)
          "
        />
      </div>
    </template>
    <template #actions>
      <div class="actions-container">
        <div class="secondary-cta-action">
          <secondary-cta-button
            v-show="displaySecondaryButton"
            :folderName="secondaryCtaFolderName"
            @click="$emit('secondary-click')"
          />
        </div>
        <document-primary-cta
          :disabled="disablePrimaryButton"
          :action="primaryCtaAction"
          @close="$emit('on-modal-close')"
          @validate="$emit('validate')"
        />
      </div>
    </template>
  </modal-two-columns>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import ModalTwoColumns from '@/Common/components/Modals/ModalTwoColumns.vue'
import DocumentPrimaryCta from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/Buttons/DocumentPrimaryCta.vue'
import SecondaryCtaButton from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/Buttons/SecondaryCtaButton.vue'
import UploadFileList from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/UploadFileList.vue'
import UploadFileInfos from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/UploadFileInfos.vue'
import FileUpload from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'
import useVModel from '@/Common/hooks'
import { useStore } from 'vuex'
import useSearchStoreHelpers from '@/modules/Search/store/helpers'
import useUploadStoreHelpers from '@/modules/DataManipulation/Upload/store/helpers'

export default defineComponent({
  name: 'NattoUploadModal',
  components: {
    ModalTwoColumns,
    DocumentPrimaryCta,
    SecondaryCtaButton,
    UploadFileList,
    UploadFileInfos
  },
  props: {
    selectedFileIndex: Number,
    primaryCtaAction: String,
    secondaryCtaFolderName: {
      type: String,
      default: ''
    },
    files: {
      type: Array as PropType<FileUpload[]>,
      required: true
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    selectedFolderToUpload: Number,
    disabledCategories: Boolean,
    triggerUploadAllFiles: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'display-file',
    'category-selected',
    'validate',
    'on-modal-close',
    'secondary-click',
    'change-selected-folderId'
  ],
  setup(props) {
    const store = useStore()

    const { folders } = useSearchStoreHelpers()
    const { hasPermissionToUploadFile } = useUploadStoreHelpers()
    const isOpened = useVModel(props)

    let canUpload = computed(() =>
      hasPermissionToUploadFile(store, props.selectedFolderToUpload ?? 0)
    )

    return {
      folders: folders(store),
      disableCategoryChange: computed(
        () =>
          props.disabledCategories ||
          !props.files[props.selectedFileIndex ?? 0]?.ready()
      ),
      displaySecondaryButton: computed(() => {
        if (canUpload.value) {
          return (
            props.secondaryCtaFolderName.length > 0 &&
            props.files[props.selectedFileIndex ?? 0]?.ready()
          )
        }

        return false
      }),
      disablePrimaryButton: computed(() => {
        if (canUpload.value) {
          if (props.selectedFolderToUpload === 0) {
            return true
          } else if (
            (props.primaryCtaAction === 'finish' &&
              !props.files.some((f: FileUpload) => f?.ready())) ||
            (props.primaryCtaAction !== 'finish' &&
              props.files[props.selectedFileIndex ?? 0]?.ready())
          ) {
            return false
          } else {
            return true
          }
        }

        return true
      }),
      isOpened,
      canUpload
    }
  }
})
</script>

<style lang="scss">
.header-container {
  .main-text {
    font-weight: 700;
    font-size: 18px;
    letter-spacing: 0;
    line-height: 21.09px;
    color: #171717;
  }
}

.info-section {
  max-width: 374px;
  word-break: break-word;

  p {
    font-size: 14px;
    line-height: 20px;
    color: #6b6e74;
  }
}

.right-content-container {
  margin-bottom: 4%;

  .upload-infos-container {
    grid-template-rows: 36px 400px;

    .upload-infos-breadcrumb {
      display: flex;
      align-items: center;
    }
  }

  .folderItem {
    height: 20px;
    border-bottom: unset;

    .item-content {
      width: 100%;

      .item-icon {
        margin-right: 3%;
      }

      .item-text {
        width: 97%;
        font-size: 14px;
        line-height: 20px;
        font-weight: 400;
        color: #3c3c3b;
      }

      .item-text + .item-icon {
        margin-right: 0;
      }
    }
  }
}

.actions-container {
  display: flex;
  width: 100%;
  justify-content: flex-end;

  .secondary-cta-action {
    padding-right: 24px;
  }
}

.fileSelectedError {
  color: #bc204b;
}

.modal-rightpanel-content {
  width: calc(100% - 6%);
  margin-left: 6%;
}

.modal-two-columns {
  .modal-panel-title {
    margin-left: 6%;
  }
}
</style>
