<template>
  <natto-drop-zone
    class="arbo-documents__drop-zone"
    :disabled="isTableDropZoneDisabled"
    @files-changes="handleDroppedFiles"
  >
    <multiple-documents-ctas
      :selected-documents-ids="state.selectedDocumentsIds"
      @download-all-clicked="handleDownloadAll"
      @delete-all-clicked="handleDeleteAll"
    />
    <template #over-content>
      <arbo-documents-table-drop-zone-content />
    </template>
    <div class="arbo-documents__table">
      <natto-table
        ref="nattoTableRef"
        hide-header
        :are-all-selected="areAllSelected"
        :table-data="documents.collection"
        :loading="documents.isLoading"
        :items-per-page="documentsPerPage"
        :items-total="documentsTotalInFolderAndChild"
        :pageNumber="pageNumber"
        :sort-options="sortOptions"
        paginated
        highlight-row-on-click
        is-selection
        @page-opened="handlePageOpened"
        @sort-arbo-table="propagateSortEvent"
        @row-clicked="handleRowClick"
        @selection-change="selectionChangeHandler"
        @select-all="handleSelectAll"
      >
        <template #prepend-table>
          <documents-folders-browser
            v-if="!isSearchActive"
            v-model:search-folder-id="searchFolder"
            :folders="folders"
          />
          <documents-in-folder-and-child-bar
            v-if="isSearchActive"
            :nb-documents-in-folder-and-child="documentsTotalInFolderAndChild"
          />
        </template>
        <template #default>
          <document-name-element
            :display-description="isSearchActive"
            :search="search"
          />
          <document-creation-date-element />
          <document-sync-status-element v-if="isCollabUser" />
          <document-actions-element
            :display-go-to="isSearchActive"
            @document-dropdown-clicked="handleActionDropdownClicked"
            @download-clicked="$emit('on-download-document', $event.documentId)"
            @delete-clicked="handleDeleteFileClicked"
            @goto-clicked="handleGoTo"
            @actions-activator-selected="handleActivatorSelection"
          />
        </template>
        <template #append-table>
          <documents-in-all-folders-bar
            v-if="isSearchActive"
            :nb-documents-in-all-folders="documentsTotalInAllFolders"
            @click="$emit('click-on-total-count')"
          />
        </template>
      </natto-table>
    </div>
  </natto-drop-zone>
  <delete-file-modal-confirmation
    v-model="state.isDeleteFileModalConfirmationOpened"
    :document-ids="state.selectedDocumentsIds"
    :is-synchronized-document="state.isSynchronizedDocument"
    @delete-file-confirmed="$emit('delete-file-confirmed')"
  />
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import useVModel from '@/Common/hooks'
import NattoTable from '@/Common/components/Table/NattoTable.vue'

import Documents from '@/modules/Search/models/Documents/Inputs/Documents'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'

import DocumentsFoldersBrowser from '@/modules/Search/components/Navigation/DocumentsFoldersBrowser.vue'
import DocumentNameElement from '@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentNameElement.vue'
import DocumentCreationDateElement from '@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentCreationDateElement.vue'
import DocumentActionsElement from '@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentActionsElement.vue'
import DocumentsInAllFoldersBar from '@/modules/Search/components/Filters/InfoBars/DocumentsInAllFoldersBar.vue'
import DocumentsInFolderAndChildBar from '@/modules/Search/components/Filters/InfoBars/DocumentsInFolderAndChildBar.vue'
import DocumentSyncStatusElement from '@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentSyncStatusElement.vue'
import DeleteFileModalConfirmation from '@/modules/DataManipulation/Delete/DeleteFile/components/Modals/DeleteFileModalConfirmation.vue'
import DocumentsSortOptions from '@/modules/Search/models/Documents/Query/DocumentsSortOptions'
import NattoDropZone from '@/Common/components/Upload/NattoDropZone.vue'
import ArboDocumentsTableDropZoneContent from '@/modules/Search/components/DocumentsTable/ArboDocumentsTableDropZoneContent.vue'
import Document from '@/modules/Search/models/Documents/Inputs/Document'
import MultipleDocumentsCtas from '@/modules/Search/components/Buttons/MultipleDocumentsCtas/MultipleDocumentsCtas.vue'
import useSearchStoreHelpers from '@/modules/Search/store/helpers'
import { useStore } from 'vuex'
import { isString } from 'lodash'

export default defineComponent({
  name: 'ArboDocumentsTable',
  components: {
    MultipleDocumentsCtas,
    ArboDocumentsTableDropZoneContent,
    NattoDropZone,
    DocumentsInFolderAndChildBar,
    DocumentsInAllFoldersBar,
    DocumentActionsElement,
    DocumentCreationDateElement,
    DocumentNameElement,
    NattoTable,
    DocumentsFoldersBrowser,
    DocumentSyncStatusElement,
    DeleteFileModalConfirmation
  },
  props: {
    sortOptions: {
      type: DocumentsSortOptions,
      required: false
    },
    folders: {
      type: Folders,
      required: true
    },
    documents: {
      type: Documents,
      required: true
    },
    searchFolderId: {
      type: Number,
      required: true
    },
    documentsPerPage: {
      type: Number,
      required: true
    },
    documentsTotalInFolderAndChild: {
      type: Number,
      default: 0
    },
    documentsTotalInAllFolders: {
      type: Number,
      default: 0
    },
    isCollabUser: {
      type: Boolean,
      default: false
    },
    pageNumber: {
      type: Number,
      default: 1
    },
    search: String,
    isTableDropZoneDisabled: Boolean
  },
  emits: [
    'update:searchFolderId',
    'onDownloadDocument',
    'click-on-total-count',
    'page-opened',
    'sort-arbo-table',
    'files-dropped',
    'document-clicked',
    'delete-file-confirmed',
    'on-actions-click'
  ],

  setup(props, { emit }) {
    const store = useStore()
    const {
      dispatchDownloadDocuments,
      setSearchFolderId,
      filters,
      setSearch,
      fetchDocuments
    } = useSearchStoreHelpers()

    const nattoTableRef = ref(null as any)
    const searchFolder = useVModel(props, 'searchFolderId')

    const state = reactive({
      isDeleteFileModalConfirmationOpened: false,
      selectedDocumentsIds: [] as string[],
      isSynchronizedDocument: false
    })

    const handleActionDropdownClicked = (documentId: string) => {
      if (
        documentId &&
        (!state.selectedDocumentsIds ||
          state.selectedDocumentsIds?.length === 0 ||
          !state.selectedDocumentsIds?.every((docId) => docId === documentId))
      ) {
        clearTableSelection(documentId)
      }
    }

    const handleDeleteFileClicked = (args: {
      documentId: string
      isSynchronizedDocument: boolean
    }) => {
      clearTableSelection(args.documentId)
      state.isDeleteFileModalConfirmationOpened = true
      state.isSynchronizedDocument = args.isSynchronizedDocument
    }
    const clearTableSelection = (documentId: string) => {
      nattoTableRef.value?.clearSelection()
      if (documentId) {
        nattoTableRef.value?.selectRow(documentId)
        state.selectedDocumentsIds = [documentId]
      }
    }

    const handlePageOpened = (pageNumber: number) => {
      emit('page-opened', pageNumber)
    }

    const handleDroppedFiles = (filesData: File[]) => {
      emit('files-dropped', filesData)
    }

    const handleRowClick = (doc: Document) => {
      if (doc.name) {
        emit('document-clicked', doc)
      }
    }

    const handleSelectAll = () => {
      nattoTableRef.value?.toggleAll()
    }

    const isSearchActive = computed(() => !!props.search)

    const selectionChangeHandler = (documentIds: string[]) => {
      if (documentIds.length > 0 && !isString(documentIds[0])) {
        return
      }

      state.selectedDocumentsIds = documentIds
    }

    const handleActivatorSelection = (documentId: string) => {
      const document = props.documents?.collection.filter(
        (d) => d.id === documentId
      )[0]

      emit('on-actions-click', document)
    }

    const handleDeleteAll = async () => {
      state.isDeleteFileModalConfirmationOpened = true
    }

    const handleDownloadAll = async () => {
      await dispatchDownloadDocuments(store, state.selectedDocumentsIds)
    }

    const handleGoTo = async ({ folderId }: { folderId: number }) => {
      setSearchFolderId(store, {
        searchFolderId: folderId,
        findInChildFolders: filters(store).value.findInChildFolders
      })
      setSearch(store, '')
      await fetchDocuments(store)
    }

    const areAllSelected = computed(
      () =>
        props.documents.collection.length ===
          state.selectedDocumentsIds.length &&
        props.documents.collection.length !== 0
    )

    return {
      areAllSelected,
      handleActionDropdownClicked,
      clearTableSelection,
      nattoTableRef,
      selectionChangeHandler,
      handleDroppedFiles,
      state,
      searchFolder,
      handleDeleteFileClicked,
      handlePageOpened,
      propagateSortEvent: (data: DocumentsSortOptions) => {
        emit('sort-arbo-table', data)
      },
      handleRowClick,
      isSearchActive,
      handleActivatorSelection,
      handleDeleteAll,
      handleDownloadAll,
      handleSelectAll,
      handleGoTo
    }
  }
})
</script>

<style lang="scss">
.arbo-documents__drop-zone {
  .natto-table {
    min-height: 35vh;

    &__card {
      padding: 4px;
    }

    .cell {
      padding-left: 0;
      padding-right: 0;
    }
  }
}
</style>

<style lang="scss" scoped>
.arbo-documents {
  &__table {
    background: white;
    border-radius: 8px;
    padding: 12px 0;
    &-prepend {
      display: flex;
    }
  }
}
</style>
