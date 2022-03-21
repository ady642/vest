<template>
  <div v-if="displayError">
    <div class="error-zone">
      <p class="error-libelle">{{ file.errorDescription.libelle }}</p>
      <p class="error-descriptif">{{ file.errorDescription.description }}</p>
    </div>
  </div>
  <div v-else>
    <div class="upload-infos-container">
      <div class="upload-infos-breadcrumb">
        <upload-breadcrumb
          :folders="folders"
          v-model:selected-folder-to-upload="selectedFolderId"
          :disabledBreadcrumb="disabledCategories"
        />
        <div
          class="add-folder-icon"
          v-if="folderHasChildrens && canAddFolder && !disabledCategories"
          @click="displayCreateFoldersForm"
        >
          <natto-icon :elementName="'folder-add'" />
        </div>
      </div>

      <div class="upload-infos-browser">
        <upload-file-infos-description
          v-if="displayUploadFileDescription"
          :selected-folder-name="selectedFolder?.name"
        />
        <folder-info-box
          v-if="!triggerUploadAllFiles"
          :canUpload="canUpload"
          :folderName="selectedFolder?.name"
          :folderDescription="selectedFolder?.properties?.folderDescription"
        />

        <documents-folders-creation
          v-if="displayFoldersCreation"
          :showForm="showForm"
          :selectedFolderId="selectedFolderToUpload"
          :creation-folder-error="creationFolderError"
          @on-folder-creation-cta-click="displayCreateFoldersFormByCTA"
          @on-create-folder="handleCreateClick"
          @on-cancel-create-folder="handleCancelClick"
        />
        <upload-document-navigator
          v-if="displayDocumentNavigator"
          v-model:search-folder-id="selectedFolderId"
          :folders="folders"
          :disabled="disabledCategories"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import useVModel from '@/Common/hooks'
import FileUpload from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'
import UploadBreadcrumb from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/UploadBreadcrumb.vue'
import FolderInfoBox from '@/modules/DataManipulation/Upload/components/Notification/FolderInfoBox.vue'
import DocumentsFoldersCreation from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/Forms/DocumentsFoldersCreation.vue'
import { CreateFolderQuery } from '@/modules/Search/types'
import NattoIcon from '@/Common/components/Icons/NattoIcon.vue'
import UploadDocumentNavigator from '@/modules/DataManipulation/Upload/components/Navigation/UploadDocumentNavigator.vue'
import { useStore } from 'vuex'
import useCreateFolderModule from '@/modules/DataManipulation/Create/CreateFolder/store/helpers'
import useSearchStoreHelpers from '@/modules/Search/store/helpers'
import { trackEventFactory } from '@/Common/helpers/analyticsLog'
import analyticsCode from '@/Common/constants/analyticsCode'
import UploadFileInfosDescription from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/Texts/UploadFileInfosDescription.vue'
import { useTranslation } from '@/Common/hooks/useTranslation'

export default defineComponent({
  name: 'UploadFileInfos',
  components: {
    UploadFileInfosDescription,
    UploadDocumentNavigator,
    UploadBreadcrumb,
    FolderInfoBox,
    DocumentsFoldersCreation,
    NattoIcon
  },
  props: {
    selectedFolderToUpload: {
      type: Number,
      required: true
    },
    canUpload: {
      type: Boolean
    },
    disabledCategories: Boolean,
    file: {
      type: FileUpload,
      required: true
    },
    triggerUploadAllFiles: {
      type: Boolean,
      default: false
    }
  },

  emits: ['update:selectedFolderToUpload', 'reload-folders'],

  setup(props) {
    const store = useStore()
    const { createFolderByModal, hasPermissionToAddFolder } =
      useCreateFolderModule(store)
    const { t } = useTranslation()
    const { folders } = useSearchStoreHelpers()
    const creationFolderError = ref('')
    const canAddFolder = computed(() =>
      hasPermissionToAddFolder(props.selectedFolderToUpload)
    )
    const selectedFolderId = useVModel(props, 'selectedFolderToUpload')
    const displayFolderCreation = ref(false)
    const showForm = ref(false)
    const selectedFolder = computed(() =>
      folders(store).value.getFolderById(selectedFolderId.value)
    )
    const showCreateFolderForm = computed(() => {
      if (props.selectedFolderToUpload !== 0 && canAddFolder.value) {
        return (
          selectedFolder.value?.children.length === 0 ||
          displayFolderCreation.value
        )
      }

      return false
    })
    const showFoldersBrowser = computed(() => {
      return !props.disabledCategories && !displayFolderCreation.value
    })

    return {
      displayError: computed(
        () => props.file?.error() || props.file?.canceled()
      ),
      creationFolderError,
      displayUploadFileDescription: computed(
        () =>
          (props.file?.running() || props.file?.finished()) &&
          props.triggerUploadAllFiles
      ),
      folderHasChildrens: computed(
        () => (selectedFolder?.value?.children?.length ?? 0) > 0
      ),
      folders: folders(store),
      selectedFolderId,
      selectedFolder,
      displayFolderCreation,
      showForm,
      canAddFolder,
      displayFoldersCreation: computed(
        () => !props.disabledCategories && showCreateFolderForm.value
      ),
      displayDocumentNavigator: computed(
        () => !props.disabledCategories && showFoldersBrowser.value
      ),
      displayCreateFoldersForm: () => {
        trackEventFactory(
          analyticsCode['updm-select-destination-file-add-folder-icon']
        )
        displayFolderCreation.value = true
        showForm.value = true
      },
      displayCreateFoldersFormByCTA: () => {
        trackEventFactory(
          analyticsCode['updm-select-destination-file-add-folder-cta']
        )
        showForm.value = true
      },
      handleCancelClick: () => {
        creationFolderError.value = ''
        showForm.value = false
        displayFolderCreation.value = false
      },
      handleCreateClick: async (query: CreateFolderQuery) => {
        creationFolderError.value = ''
        trackEventFactory(
          analyticsCode['updm-select-destination-file-create-folder']
        )

        try {
          await createFolderByModal(query)

          showForm.value = false
          displayFolderCreation.value = false
        } catch (error) {
          if (error.code === 403) {
            creationFolderError.value = t(
              'ged.dataManipulation.create.folder.error.alreadyExists',
              { folderName: query.folderName }
            )
          } else {
            throw error
          }
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.upload-infos-container {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 7% 93%;
  grid-auto-rows: 1fr;
  grid-template-areas:
    'breadcrumb'
    'browser';
  border-radius: 10px;
  border: 1px solid #c0c4cc;

  .add-folder-icon {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    margin-right: 2vh;
    font-size: 19px;
    color: var(--primary);
    font-weight: 500;
    cursor: pointer;
  }
}

.upload-infos-breadcrumb {
  grid-area: breadcrumb;
}

.upload-infos-browser {
  grid-area: browser;
  border-top: 1px solid #c0c4cc;
  overflow-y: auto;

  .documents-folders-creation-container {
    margin: 0 auto;
  }
}

.to-3-rows-grid {
  display: grid;
  grid-template-rows: auto auto auto;
}

.error-zone {
  height: 400px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
}

.error-libelle {
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;

  display: flex;
  align-items: center;
  text-align: center;

  color: #171717;
  word-break: break-word;
}

.error-descriptif {
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;

  display: flex;
  align-items: center;
  text-align: center;

  color: #171717;
}
</style>
