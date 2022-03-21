<template>
  <router-view
    v-model:is-document-upload-modal-opened="isDocumentUploadModalOpened"
    @disable-selection-categories="disabledSelectionCategories = $event"
    @upload-all-files-same-folder="triggerUploadAllFiles = true"
    @on-files-dropped="showPopup"
  />
  <documents-upload-modal
    v-model="isDocumentUploadModalOpened"
    :disabled-categories="disabledSelectionCategories"
    :trigger-upload-all-files="triggerUploadAllFiles"
    @reset="resetHandler"
  />
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  watch,
  onBeforeUnmount
} from 'vue'
import { router } from '@kpmg/mypulse-shared-dependencies'
import { useStore } from 'vuex'
import DocumentsUploadModal from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/DocumentsUploadModal.vue'
import useSearchStoreHelpers from '@/modules/Search/store/helpers'
import useUploadStoreHelpers from '@/modules/DataManipulation/Upload/store/helpers'
import uploadModalHelper from '@/modules/DataManipulation/Upload/helpers/uploadModalHelper'
import { trackEventFactory } from '@/Common/helpers/analyticsLog'
import analyticsCode from '@/Common/constants/analyticsCode'
import useSearchNavigator from '@/modules/Search/navigator/useSearchNavigator'

export default defineComponent({
  name: 'SearchPage',
  components: {
    DocumentsUploadModal
  },
  setup() {
    const store = useStore()
    const {
      accountId,
      fetchFolders,
      fetchDocuments,
      fetchDocumentsTotalCount,
      setPage,
      addFetchDocumentsSubscriber
    } = useSearchStoreHelpers()

    const unsubscribe = addFetchDocumentsSubscriber(store)

    onBeforeUnmount(() => {
      unsubscribe()
    })

    const {
      getFiles,
      setGedNotification,
      cancelFilesUpload,
      closeGedNotification,
      sortFiles
    } = useUploadStoreHelpers()

    const { cancelFileUploadNotification, getUploadNotification } =
      uploadModalHelper()

    const { goToMainView } = useSearchNavigator()

    const isDocumentUploadModalOpened = ref(false)
    const ready = computed(() => accountId(store))
    const disabledSelectionCategories = ref(false)
    const triggerUploadAllFiles = ref(false)

    onMounted(async () => {
      await fetchFolders(store)
    })

    const resetHandler = async () => {
      isDocumentUploadModalOpened.value = false
      triggerUploadAllFiles.value = false
      showPopup(false, true)
      setPage(store, 1)

      await Promise.all([
        fetchDocuments(store),
        fetchDocumentsTotalCount(store)
      ])
    }

    const cancelUploadConfirmationHandler = (action: string) => {
      if (action === 'confirm') {
        trackEventFactory(analyticsCode['upt-upload-cancel-popup-continue'])
        showPopup(true)
        cancelFilesUpload(store)
      } else if (action === 'cancel') {
        trackEventFactory(analyticsCode['upt-upload-cancel-popup-cancel'])
      }
    }

    const showPopup = (loading?: boolean, fromModal?: boolean) => {
      if (
        !getFiles(store).value ||
        getFiles(store).value.some((f) => f.ready()) ||
        (getFiles(store).value.every((f) => f.finished()) && fromModal)
      ) {
        return
      }
      closeGedNotification(store)
      const notification = getUploadNotification(
        loading,
        getFiles(store),
        () => cancelFileUploadNotification(cancelUploadConfirmationHandler),
        () => closeGedNotification(store),
        () => openUploadModal()
      )

      setGedNotification(store, notification)
    }

    const openUploadModal = () => {
      // todo: move the upload modal to the app.vue
      // (edge case when we are in trash the upload modal is not visible bcz of variables scope that is only for searchpage)
      sortFiles(store)
      if (
        router.currentRoute.value.path.includes('/documents/trash') ||
        !router.currentRoute.value.path.includes('/documents')
      ) {
        goToMainView({ openFilesUploadModal: true })
      } else {
        isDocumentUploadModalOpened.value = true
      }
    }

    watch(isDocumentUploadModalOpened, () => {
      if (isDocumentUploadModalOpened.value) {
        closeGedNotification(store)
      } else {
        trackEventFactory(analyticsCode['updm-select-destination-cross-close'])
      }
    })

    return {
      openUploadModal,
      ready,
      isDocumentUploadModalOpened,
      resetHandler,
      disabledSelectionCategories,
      triggerUploadAllFiles,
      showPopup
    }
  }
})
</script>
