<template>
  <div
    class="main-view"
    v-loading="folders.isLoading"
    element-loading-background="transparent"
  >
    <main-view-layout
      :disabled="isUploading"
      :hasAccessDs="hasAccessDs"
      is-main-view-btn
      @upload-triggered="handleFilesOnChangeByUploadBtn"
    >
      <template #tree>
        <main-view-tree :folders="folders" />
      </template>
      <template #list-view>
        <documents-search-filters
          :search="filters.search"
          :active-filters-count="activeFiltersCount"
          @update:search="handleChangeInput"
          @change-filters="handleChangeFilters"
          @reset-filters="handleResetFilters"
        />
        <template v-if="areAnyFilters">
          <folder-tabs :folders="folders" @tab-selected="tabSelectedHandler" />
          <documents-table
            class="main-doc-content"
            :documents="documents"
            :search="filters.search"
            :are-all-documents-loaded="areAllDocumentsLoaded"
            @on-download-document="dispatchDownloadDocument"
            @on-scroll-to-bottom="handleScrollToBottom"
            @document-clicked="handleDocumentClicked"
          />
        </template>
        <div class="arbo-card-list" v-else>
          <arbo-card-list />
          <trash-card v-show="folders.collection.length > 0" />
        </div>
      </template>
      <template #dragfile>
        <documents-upload-box
          v-show="displayUploadBox"
          :disabled="isUploading"
          @on-files-change="handleFilesOnChangeByUploadBox"
        />
      </template>
      <template #category>
        <mail-to-ged-card
          v-if="folders.collection.length > 0"
          @open-mail-to-ged="handleOpenMailToGed"
        />
      </template>
    </main-view-layout>
    <who-upload-modal
      v-model="isUploadTypeModalOpened"
      :folders="folders"
      @on-treat-by-client="handleUploadByClient"
      @on-treat-by-collab="handleUploadByCollab"
      @popup-folder-select-close="handleUploadTypeModalClose"
    />
    <mail-to-ged-modal
      v-model="isMailToGedOpened"
      :mailToGedInfos="mailToGedInformations"
      @close="handleMailToGedCloseModal"
      @more-info="moreInfoHandler"
    />
    <document-details-drawer
      v-model:opened="showDocDrawer"
      :document="documentSelected"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { router } from '@kpmg/mypulse-shared-dependencies'

import useVModel from '@/Common/hooks'
import useSearchStoreHelpers from '@/modules/Search/store/helpers'
import MainViewLayout from '@/modules/Search/components/Layouts/MainViewLayout.vue'
import DocumentsTable from '@/modules/Search/components/DocumentsTable/DocumentsTable.vue'
import FolderTabs from '@/modules/Search/components/Tabs/FolderTabs.vue'
import DocumentsSearchFilters from '@/modules/Search/components/Filters/DocumentsSearchFilters.vue'

import useUploadStoreHelpers from '@/modules/DataManipulation/Upload/store/helpers'
import WhoUploadModal from '@/modules/DataManipulation/Upload/components/WhoUploadModal/WhoUploadModal.vue'
import DocumentsUploadBox from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Activators/DocumentsUploadBox.vue'
import DocumentsPaginator from '@/modules/Search/models/Documents/Query/DocumentsPaginator'
import { StateUpload } from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'
import FileUpload from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'
import ArboCardList from '@/modules/Search/components/Cards/ArboCardList.vue'
import MailToGedModal from '@/modules/DataManipulation/MailToGed/components/Modals/MailToGedModal.vue'
import MailToGedCard from '@/modules/DataManipulation/MailToGed/components/MailToGedCard.vue'
import {
  pageViewFactory,
  trackEventFactory
} from '@/Common/helpers/analyticsLog'
import analyticsCode from '@/Common/constants/analyticsCode'
import TrashCard from '@/modules/Trash/components/Cards/TrashCard.vue'
import redirections from '@/modules/DataManipulation/Upload/hooks/redirections'
import useMailToGedStoreHelpers from '@/modules/DataManipulation/MailToGed/store/helpers'
import useSearchNavigator from '@/modules/Search/navigator/useSearchNavigator'
import MainViewTree from '@/modules/Search/components/Trees/MainViewTree.vue'
import Period from '@/Common/models/List/Period'
import DocumentsFilters from '@/modules/Search/models/Documents/Query/DocumentsFilters'
import useDrawer from '@/modules/Search/hooks/useDrawer'
import DocumentDetailsDrawer from '@/modules/Search/components/Drawer/DocumentDetailsDrawer.vue'

export default defineComponent({
  name: 'MainView',
  components: {
    DocumentDetailsDrawer,
    MainViewTree,
    TrashCard,
    ArboCardList,
    DocumentsSearchFilters,
    MainViewLayout,
    DocumentsTable,
    DocumentsUploadBox,
    FolderTabs,
    WhoUploadModal,
    MailToGedModal,
    MailToGedCard
  },
  props: {
    isDocumentUploadModalOpened: {
      type: Boolean,
      required: true
    },
    resetFilters: {
      type: String,
      default: 'true'
    }
  },
  emits: [
    'disable-selection-categories',
    'upload-all-files-same-folder',
    'update:isDocumentUploadModalOpened'
  ],
  setup(props, { emit }) {
    pageViewFactory(analyticsCode['document-pgv'])
    const store = useStore()
    const { mailToGedInformations, GetMailToGedInformations } =
      useMailToGedStoreHelpers(store)
    const {
      folders,
      documents,
      filters,
      fetchDocuments,
      fetchAndPushDocuments,
      areAllDocumentsLoaded,
      searchFolderId,
      setSearchFolderId,
      setSearch,
      dispatchDownloadDocument,
      setPaginator,
      paginator,
      setPage,
      getActiveFiltersCount,
      areAnyFilters,
      setPeriod,
      setCertified
    } = useSearchStoreHelpers()

    const {
      setFiles,
      setSelectedFolderToUpload,
      isUploading,
      closeGedNotification,
      hasAccessDs
    } = useUploadStoreHelpers()

    const { goToMainView, goToArboView } = useSearchNavigator()

    const isUploadTypeModalOpened = ref(false)

    const { handleDocumentClicked, documentSelected, showDocDrawer } =
      useDrawer()

    const isDocumentUploadModalOpened = useVModel(
      props,
      'isDocumentUploadModalOpened'
    )

    const { goToDefaultFolder } = redirections()

    onMounted(async () => {
      setPaginator(store, new DocumentsPaginator())
      setSearchFolderId(store, { searchFolderId: 0, findInChildFolders: true })
      if (filters(store).value.search) {
        await fetchDocuments(store)
      }

      if (router.currentRoute.value.query.openWhoUploadModal) {
        isUploadTypeModalOpened.value = true
      }

      if (router.currentRoute.value.query.openFilesUploadModal) {
        isDocumentUploadModalOpened.value = true
      }
    })

    const isMailToGedOpened = ref(false)
    const moreInfoHandler = () => {
      if (mailToGedInformations.value.moreInformationLink) {
        window.open(mailToGedInformations.value.moreInformationLink)
      }
    }

    const handleOpenMailToGed = async () => {
      GetMailToGedInformations()
      isMailToGedOpened.value = true
    }

    const handleMailToGedCloseModal = () => {
      isMailToGedOpened.value = false
    }
    const handleChangeInput = async (value: string) => {
      setPage(store, 1)
      setSearchFolderId(store, {
        searchFolderId: searchFolderId(store).value,
        findInChildFolders: true
      })
      setSearch(store, value)

      await fetchDocuments(store)

      goToMainView({ search: true })
    }

    const handleChangeFilters = async (filtersPayload: DocumentsFilters) => {
      setPeriod(store, filtersPayload.period)
      setCertified(store, filtersPayload.certified)

      await fetchDocuments(store)

      goToMainView({ search: true })
    }

    const handleResetFilters = async () => {
      setSearch(store, '')
      setPeriod(store, new Period())
      setCertified(store, 'all')
    }

    const handleUploadTypeModalClose = () => {
      if (isUploadTypeModalOpened.value) {
        trackEventFactory(analyticsCode['updm-select-tree-cross-close'])
        isUploadTypeModalOpened.value = false
      }
    }

    const handleUploadByClient = (selectedDefaultFolderId: number) => {
      trackEventFactory(analyticsCode['updm-select-tree-continue-client'])
      isDocumentUploadModalOpened.value = true
      isUploadTypeModalOpened.value = false
      emit('disable-selection-categories', false)

      goToDefaultFolder(
        selectedDefaultFolderId,
        folders(store),
        selectDefaultFolder
      )
    }

    const selectDefaultFolder = (defaultFolderId: number) => {
      setSelectedFolderToUpload(store, defaultFolderId ?? 0)
    }

    const handleUploadByCollab = (selectedDefaultFolderId: number) => {
      const folder = folders(store).value.getDefaultUploadFolderById(
        selectedDefaultFolderId
      )

      if (folder?.id) {
        trackEventFactory(analyticsCode['updm-select-tree-continue-collab'])
        setSelectedFolderToUpload(store, folder.id)
        emit('disable-selection-categories', true)
        emit('upload-all-files-same-folder')
        isDocumentUploadModalOpened.value = true
        isUploadTypeModalOpened.value = false
      }
    }

    const folderShortcutClickHandle = (folderId: number) => {
      goToArboView({ folderId })
    }

    const tabSelectedHandler = async (searchFolderId: number) => {
      setPage(store, 1)

      setSearchFolderId(store, {
        searchFolderId,
        findInChildFolders: true
      })

      await fetchDocuments(store)
    }

    const handleFilesOnChange = (filesData: File[]) => {
      setFiles(
        store,
        filesData.map((f: File) => new FileUpload(f, StateUpload.TO_UPLOAD))
      )
      isUploadTypeModalOpened.value = true
      closeGedNotification(store)
    }
    const handleFilesOnChangeByUploadBox = (filesData: File[]) => {
      trackEventFactory(analyticsCode['mdv-cta-upload-widget-click'])
      handleFilesOnChange(filesData)
    }
    const handleFilesOnChangeByUploadBtn = (filesData: File[]) => {
      trackEventFactory(analyticsCode['mdv-cta-upload-button-click'])
      handleFilesOnChange(filesData)
    }

    const handleScrollToBottom = async () => {
      if (areAllDocumentsLoaded(store).value) {
        return
      }

      setPage(store, paginator(store).value.pageNumber + 1)

      await fetchAndPushDocuments(store)
    }

    const activeFiltersCount = getActiveFiltersCount(store)

    watch(
      () => router.currentRoute.value.query,
      (newVal, oldVal) => {
        if (
          (oldVal?.search && newVal?.search == null) ||
          (oldVal?.search == null && newVal?.search == null)
        ) {
          handleResetFilters()
        }
      }
    )

    return {
      moreInfoHandler,
      mailToGedInformations,
      handleOpenMailToGed,
      isMailToGedOpened,
      handleMailToGedCloseModal,
      displayUploadBox: computed(
        () => folders(store).value.collection.length > 0
      ),
      hasAccessDs: computed(() => {
        return hasAccessDs(store)
      }),
      activeFiltersCount,
      areAnyFilters: areAnyFilters(store),
      folders: folders(store),
      filters: filters(store),
      handleChangeFilters,
      handleResetFilters,
      documents: documents(store),
      areAllDocumentsLoaded: areAllDocumentsLoaded(store),
      folderShortcutClickHandle,
      tabSelectedHandler,
      handleChangeInput,
      dispatchDownloadDocument: (documentId: string) =>
        dispatchDownloadDocument(store, documentId),
      isUploadTypeModalOpened,
      handleUploadByClient,
      handleUploadByCollab,
      handleUploadTypeModalClose,
      handleScrollToBottom,
      isUploading: isUploading(store),
      handleFilesOnChangeByUploadBox,
      handleFilesOnChangeByUploadBtn,
      handleDocumentClicked,
      documentSelected,
      showDocDrawer
    }
  }
})
</script>

<style lang="scss">
.natto-category-button {
  .is-disabled {
    display: none;
  }

  .nto-btn-active {
    display: block;
  }
}

.main-view {
  .el-table {
    height: inherit;
    overflow-y: auto;
  }
}
</style>
