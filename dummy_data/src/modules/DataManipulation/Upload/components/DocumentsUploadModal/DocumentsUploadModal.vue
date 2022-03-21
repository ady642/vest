<template>
  <natto-upload-modal
    v-model="isDocumentUploadModalOpened"
    :triggerUploadAllFiles="triggerUploadAllFiles"
    :secondaryCtaFolderName="secondaryCtaFolderName"
    :selectedFileIndex="selectedFileIndex"
    :primaryCtaAction="modalNextAction"
    :selectedFolderToUpload="selectedFolder"
    :files="files"
    :disabledCategories="disabledCategories"
    @display-file="displayFileHandler"
    @validate="validateHandler"
    @on-modal-close="handleModalClose"
    @secondary-click="allFileSameFolderHandler"
    @change-selected-folderId="dispatchSetSelectedFolderToUpload"
  />
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import NattoUploadModal from '@/Common/components/Modals/NattoUploadModal.vue'
import FileUpload from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'
import useVModel from '@/Common/hooks'
import { useStore } from 'vuex'
import useUploadStoreHelpers from '@/modules/DataManipulation/Upload/store/helpers'
import useSearchStoreHelpers from '@/modules/Search/store/helpers'
import { trackEventFactory } from '@/Common/helpers/analyticsLog'
import analyticsCode from '@/Common/constants/analyticsCode'
import useUploadFilesMethod from '@/modules/DataManipulation/Upload/hooks/uploadFilesMethod'

export default defineComponent({
  name: 'DocumentsUploadModal',
  components: {
    NattoUploadModal
  },
  props: {
    disabledCategories: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Boolean,
      required: true
    },
    triggerUploadAllFiles: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const store = useStore()

    const isDocumentUploadModalOpened = useVModel(props)
    let selectedFileIndex = ref(0)

    const { setSelectedFolderToUpload, selectedFolderToUpload, getFiles } =
      useUploadStoreHelpers()

    const { uploadAllFilesInSameFolder, uploadOneFile } = useUploadFilesMethod()

    const { folders, searchFolderId } = useSearchStoreHelpers()

    watch(isDocumentUploadModalOpened, (newVal) => {
      if (newVal) {
        if (getFiles(store).value.length > 0) {
          trackEventFactory(
            analyticsCode['updm-select-destination-file-upload'],
            getFiles(store).value.length
          )
        }

        for (let index = 0; index < getFiles(store).value.length; index++) {
          trackEventFactory(
            analyticsCode['updm-select-destination-file-format'],
            getFiles(store).value[index].getFileExtension()
          )
        }
      }
    })

    const allFileSameFolderHandler = async () => {
      trackEventFactory(
        analyticsCode['updm-select-destination-file-validate-all']
      )

      const setSelectedFileIndexToLastFile = () => {
        selectedFileIndex.value = getFiles(store).value.length - 1
      }

      await uploadAllFilesInSameFolder(setSelectedFileIndexToLastFile)
    }

    const validateHandler = async () => {
      trackEventFactory(
        analyticsCode['updm-select-destination-file-validate-one']
      )

      await uploadOneFile(selectedFileIndex.value)

      if (selectedFileIndex.value < getFiles(store).value.length - 1) {
        selectedFileIndex.value++
      }
    }

    const displayFileHandler = (index: number) => {
      selectedFileIndex.value = index
      if (getFiles(store).value[index].destination) {
        setSelectedFolderToUpload(
          store,
          getFiles(store).value[index]?.destination ?? 0
        )
      }
    }

    const handleModalClose = async () => {
      selectedFileIndex.value = 0
      emit('reset')
    }

    watch(
      () => props.triggerUploadAllFiles,
      () => {
        if (props.triggerUploadAllFiles) {
          allFileSameFolderHandler()
        }
      }
    )

    watch(
      searchFolderId(store),
      (value) => {
        setSelectedFolderToUpload(store, value)
      },
      { immediate: true }
    )

    return {
      default: 'Destination du fichier selectionné',
      selectedFileIndex,
      secondaryCtaFolderName: computed(
        () =>
          folders(store).value.getFolderById(
            selectedFolderToUpload(store).value
          )?.name ?? ''
      ),
      isDocumentUploadModalOpened,
      validateHandler,
      handleModalClose,
      displayFileHandler,
      selectedFolder: computed(
        () =>
          getFiles(store).value[selectedFileIndex.value]?.destination ??
          selectedFolderToUpload(store).value
      ),
      allFileSameFolderHandler,
      files: getFiles(store),
      modalNextAction: computed(() => {
        if (getFiles(store).value.some((f: FileUpload) => f?.ready())) {
          if (selectedFileIndex.value < getFiles(store).value.length - 1) {
            return 'validateNext'
          } else {
            return 'validate'
          }
        } else {
          return 'finish'
        }
      }),
      dispatchSetSelectedFolderToUpload: (
        newselectedFolderToUpload: number
      ) => {
        trackEventFactory(
          analyticsCode['updm-select-destination-file-level'],
          folders(store).value.getFolderDeepLevel(newselectedFolderToUpload)
        )

        setSelectedFolderToUpload(store, newselectedFolderToUpload)
      }
    }
  }
})
</script>
