<template>
  <arbo-view-layout>
    <template #documents-view-header>
      <arbo-header
        v-if="!folders?.isLoading"
        :search-folder-id="searchFolderId"
        :folders="folders"
        :disabledUpload="isUploading"
        :canUploadFiles="canUpload"
        :hasAccessDs="hasAccessDs"
        @back-click="handleBackToMainView"
        @upload-triggered="handleFilesOnChange"
        @update:searchFolderId="dispatchSetSearchFolderId"
      />
    </template>
    <template #list-view>
      <div class="browse-documents display:flex">
        <documents-search-filters
          :search="filters.search"
          :active-filters-count="activeFiltersCount"
          @update:search="handleChangeInput"
          @change-filters="handleChangeFilters"
          @reset-filters="handleResetFilters"
        />
        <arbo-documents-table
          ref="arboTableRef"
          :search-folder-id="searchFolderId"
          :documents="documents"
          :folders="folders"
          :documents-total-in-folder-and-child="paginator.totalItems"
          :documents-total-in-all-folders="documentsTotalCount"
          :documents-per-page="paginator.itemsPerPage"
          :pageNumber="paginator.pageNumber"
          :search="filters.search"
          :sort-options="sortOptions"
          :is-table-drop-zone-disabled="isTableDropZoneDisabled"
          @sort-arbo-table="sortTableHandler"
          @on-download-document="dispatchDownloadDocument"
          @page-opened="pageChanged"
          @click-on-total-count="handleBackToMainView(false)"
          @update:searchFolderId="dispatchSetSearchFolderId"
          @files-dropped="handleFilesDropped"
          @document-clicked="handleDocumentClicked"
          @on-actions-click="handleActionsSelection"
        />
      </div>
      <document-details-drawer
        v-model:opened="showDocDrawer"
        :document="documentSelected"
      />
    </template>
  </arbo-view-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, provide, computed, ref } from 'vue'
import { router } from '@kpmg/mypulse-shared-dependencies'
import { useStore } from 'vuex'
import useVModel from '@/Common/hooks'
import FileUpload, {
  StateUpload
} from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'
import DocumentsPaginator from '@/modules/Search/models/Documents/Query/DocumentsPaginator'
import ArboViewLayout from '@/modules/Search/components/Layouts/ArboViewLayout.vue'
import useSearchStoreHelpers from '@/modules/Search/store/helpers'
import useUploadStoreHelpers from '@/modules/DataManipulation/Upload/store/helpers'
import ArboHeader from '@/modules/Search/components/Headers/ArboHeader.vue'
import ArboDocumentsTable from '@/modules/Search/components/DocumentsTable/ArboDocumentsTable.vue'
import Period from '@/Common/models/List/Period'
import DocumentsFilters from '@/modules/Search/models/Documents/Query/DocumentsFilters'
import constants from '@/Common/constants'
import DocumentsSearchFilters from '@/modules/Search/components/Filters/DocumentsSearchFilters.vue'
import {
  pageViewFactory,
  trackEventFactory
} from '@/Common/helpers/analyticsLog'
import analyticsCode from '@/Common/constants/analyticsCode'
import DocumentsSortOptions from '@/modules/Search/models/Documents/Query/DocumentsSortOptions'
import useSearchNavigator from '@/modules/Search/navigator/useSearchNavigator'
import useUploadFilesMethod from '@/modules/DataManipulation/Upload/hooks/uploadFilesMethod'
import DocumentDetailsDrawer from '@/modules/Search/components/Drawer/DocumentDetailsDrawer.vue'
import Document from '@/modules/Search/models/Documents/Inputs/Document'
import useDrawer from '@/modules/Search/hooks/useDrawer'

export default defineComponent({
  name: 'ArboView',
  components: {
    DocumentsSearchFilters,
    ArboDocumentsTable,
    ArboHeader,
    ArboViewLayout,
    DocumentDetailsDrawer
  },

  props: {
    isDocumentUploadModalOpened: {
      type: Boolean,
      required: true
    }
  },
  emits: [
    'on-selected-folder-change',
    'disable-selection-categories',
    'update:isDocumentUploadModalOpened',
    'on-files-dropped'
  ],

  setup(props, { emit }) {
    const arboTableRef = ref(null as any)

    pageViewFactory(analyticsCode['arboview-pgv'])
    const store = useStore()

    const { handleDocumentClicked, documentSelected, showDocDrawer } =
      useDrawer()

    const {
      folders,
      documents,
      fetchDocuments,
      paginator,
      setPaginator,
      setPage,
      setFilters,
      resetFilters,
      setSearchFolderId,
      setSearch,
      dispatchDownloadDocument,
      filters,
      flushDocumentsPromises,
      documentsTotalCount,
      searchFolderId,
      setPeriod,
      getActiveFiltersCount,
      sortOptions,
      setSortOptions,
      setCertified
    } = useSearchStoreHelpers()

    const {
      setFiles,
      isUploading,
      hasPermissionToUploadFile,
      hasAccessDs,
      setSelectedFolderToUpload
    } = useUploadStoreHelpers()

    const { uploadAllFilesInSameFolder } = useUploadFilesMethod()

    const { goToMainView } = useSearchNavigator()

    provide(
      'documentsLoading',
      computed(() => documents(store).value.isLoading)
    )

    const isDocumentUploadModalOpened = useVModel(
      props,
      'isDocumentUploadModalOpened'
    )

    const handleBackToMainView = async (reset = true) => {
      if (reset) {
        const parent = folders(store)?.value.getFolderById(
          searchFolderId(store).value
        )?.parentId

        if (parent !== 0) {
          setSearchFolderId(store, {
            searchFolderId: parent ?? 0
          })

          await flushDocumentsPromises(store)
        } else {
          goToMainView()
        }
      } else {
        goToMainView({ search: true })
      }
    }

    const defaultPaginator = new DocumentsPaginator({
      pageNumber: 1,
      itemsPerPage: constants.ARBO_VIEW_ITEMS_PER_PAGE,
      totalItems: 0
    })

    setPaginator(store, defaultPaginator)

    setFilters(
      store,
      DocumentsFilters.createFromRouteQuery(router.currentRoute.value.query)
    )

    onMounted(async () => {
      await flushDocumentsPromises(store)
    })

    const handleChangeInput = async (value: string) => {
      setSearch(store, value)
      setSearchFolderId(store, {
        searchFolderId: searchFolderId(store).value,
        findInChildFolders: Boolean(value) // Set at true only if a value is provided
      })

      setPaginator(store, defaultPaginator)

      await flushDocumentsPromises(store)
    }

    const handleChangeFilters = async (filtersPayload: DocumentsFilters) => {
      setPeriod(store, filtersPayload.period)
      setCertified(store, filtersPayload.certified)
      await flushDocumentsPromises(store)
    }

    const handleResetFilters = async () => {
      setPeriod(store, new Period())
      setSearch(store, '')
      setCertified(store, 'all')
      await flushDocumentsPromises(store)
    }

    const resetDocuments = async () => {
      setPaginator(store, defaultPaginator)
      setSortOptions(
        store,
        new DocumentsSortOptions({
          sortBy: 'updated',
          sortDirection: 'descending'
        })
      )
      resetFilters(store)
      await fetchDocuments(store)
    }

    const handleFilesOnChange = (filesData: File[]) => {
      trackEventFactory(analyticsCode['adv-cta-upload-widget-click'])

      const filesToUpload = filesData.map(
        (f: File) => new FileUpload(f, StateUpload.TO_UPLOAD)
      )

      setFiles(store, filesToUpload)

      setSelectedFolderToUpload(store, searchFolderId(store).value)

      isDocumentUploadModalOpened.value = true
    }

    const pageChanged = async (pageNumber: number) => {
      trackEventFactory(analyticsCode['adv-paginate'], pageNumber)
      setPage(store, pageNumber)

      await fetchDocuments(store)
    }
    const dispatchSetSearchFolderId = async (newSearchFolderId: number) => {
      setSearchFolderId(store, {
        searchFolderId: newSearchFolderId,
        findInChildFolders: false
      })
      await resetDocuments()

      trackEventFactory(
        analyticsCode['adv-navigation-files'],
        folders(store).value.getFolderDeepLevel(searchFolderId(store).value),
        documents(store).value.collection.length
      )
      trackEventFactory(
        analyticsCode['adv-navigation-folders'],
        folders(store).value.getFolderDeepLevel(searchFolderId(store).value),
        folders(store).value.getFolderById(searchFolderId(store).value)
          ?.children.length ?? 0
      )
    }
    const dispatchDownloadDocumentHandler = (documentId: string) => {
      trackEventFactory(analyticsCode['adv-download-file'])
      dispatchDownloadDocument(store, documentId)
    }

    const sortTableHandler = async (data: DocumentsSortOptions) => {
      setSortOptions(store, data)
      await fetchDocuments(store)
    }

    const handleFilesDropped = async (filesData: File[]) => {
      const filesToUpload = filesData.map(
        (f: File) => new FileUpload(f, StateUpload.TO_UPLOAD)
      )

      await setFiles(store, filesToUpload)

      const emitOnFilesDropped = () => emit('on-files-dropped')

      await uploadAllFilesInSameFolder(emitOnFilesDropped)
    }

    const handleActionsSelection = (document: Document) => {
      documentSelected.value = document
    }

    return {
      arboTableRef,
      handleFilesDropped,
      isTableDropZoneDisabled: computed(
        () =>
          isUploading(store).value ||
          !hasPermissionToUploadFile(store, searchFolderId(store).value) ||
          !hasAccessDs(store)
      ),
      canUpload: computed(() => {
        return hasPermissionToUploadFile(store, searchFolderId(store).value)
      }),
      hasAccessDs: computed(() => {
        return hasAccessDs(store)
      }),
      activeFiltersCount: getActiveFiltersCount(store),
      folders: folders(store),
      documents: documents(store),
      documentsTotalCount: documentsTotalCount(store),
      paginator: paginator(store),
      handleChangeInput,
      pageChanged,
      handleFilesOnChange,
      searchFolderId: searchFolderId(store),
      dispatchDownloadDocument: (documentId: string) =>
        dispatchDownloadDocumentHandler(documentId),
      filters: filters(store),
      handleBackToMainView,
      dispatchSetSearchFolderId,
      handleChangeFilters,
      handleResetFilters,
      isUploading: isUploading(store),
      sortOptions: sortOptions(store),
      sortTableHandler,
      handleDocumentClicked,
      showDocDrawer,
      documentSelected,
      handleActionsSelection
    }
  }
})
</script>
