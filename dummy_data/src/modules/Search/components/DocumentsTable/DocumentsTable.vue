<template>
  <natto-table
    :table-data="documents.collection"
    :loading="documents.state === 'loading'"
    :hide-header="hideHeader"
    :infinite-scroll-finished="areAllDocumentsLoaded"
    :cell-class-name="documentsCellClassName"
    @on-scroll-to-bottom="handleScrollToBottom"
    @row-clicked="$emit('document-clicked', $event)"
  >
    <document-type />
    <document-name-element :search="search" display-description />
    <document-creation-date />
    <document-sync-status-element v-if="isCollabUser" />
    <document-actions
      display-go-to
      @goto-clicked="handleGoTo"
      @delete-clicked="handleDeleteFileClicked"
      @download-clicked="$emit('on-download-document', $event.documentId)"
    />
  </natto-table>
  <delete-file-modal-confirmation
    v-model="fileDeleteModalState.isDeleteFileModalConfirmationOpened"
    :document-ids="fileDeleteModalState.documentId"
    :is-synchronized-document="fileDeleteModalState.isSynchronizedDocument"
  />
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import NattoTable from '@/Common/components/Table/NattoTable.vue'
import DocumentCreationDate from '@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentCreationDateElement.vue'
import DocumentNameElement from '@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentNameElement.vue'
import DocumentActions from '@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentActionsElement.vue'
import DocumentSyncStatusElement from '@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentSyncStatusElement.vue'
import Documents from '@/modules/Search/models/Documents/Inputs/Documents'
import DocumentType from '@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentTypeElement.vue'
import DeleteFileModalConfirmation from '@/modules/DataManipulation/Delete/DeleteFile/components/Modals/DeleteFileModalConfirmation.vue'
import useSearchNavigator from '@/modules/Search/navigator/useSearchNavigator'

export default defineComponent({
  name: 'DocumentsTable',
  components: {
    DocumentType,
    DocumentActions,
    DocumentNameElement,
    DocumentCreationDate,
    NattoTable,
    DocumentSyncStatusElement,
    DeleteFileModalConfirmation
  },

  props: {
    documents: {
      type: Documents,
      required: true
    },
    hideHeader: Boolean,
    areAllDocumentsLoaded: Boolean,
    isCollabUser: Boolean,
    search: String
  },

  emits: ['on-download-document', 'on-scroll-to-bottom', 'document-clicked'],

  setup(props, { emit }) {
    const { goToArboView } = useSearchNavigator()

    const documentsCellClassName = ({
      columnIndex
    }: {
      row: unknown
      column: unknown
      rowIndex: number
      columnIndex: number
    }): string => {
      if (columnIndex === 0) {
        // Index 0 is the column of the file type icon

        return 'justify-center'
      }

      return ''
    }

    const fileDeleteModalState = reactive({
      isDeleteFileModalConfirmationOpened: false,
      documentId: [] as string[],
      isSynchronizedDocument: false
    })

    const handleGoTo = ({ folderId }: { folderId: number }) => {
      goToArboView({ folderId })
    }

    const handleDeleteFileClicked = (args: {
      documentId: string
      isSynchronizedDocument: boolean
    }) => {
      fileDeleteModalState.documentId = [args.documentId]
      fileDeleteModalState.isDeleteFileModalConfirmationOpened = true
      fileDeleteModalState.isSynchronizedDocument = args.isSynchronizedDocument
    }

    const handleScrollToBottom = () => {
      emit('on-scroll-to-bottom')
    }

    return {
      documentsCellClassName,
      fileDeleteModalState,
      handleDeleteFileClicked,
      handleScrollToBottom,
      handleGoTo
    }
  }
})
</script>
