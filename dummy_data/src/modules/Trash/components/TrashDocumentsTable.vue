<template>
  <div class="trash-documents-table">
    <natto-table
      :table-data="documents.collection"
      :loading="areDocumentsLoading"
      :pageNumber="pageNumber"
      :items-per-page="documentsPerPage"
      :items-total="documentsTotalInFolderAndChild"
      :row-class-name="trashDocumentRowClass"
      paginated
      @page-opened="handlePageOpened"
    >
      <template #default>
        <document-type-element />
        <document-name-element
          value="Nom du dossier/document"
          display-description
        />
        <!-- <trash-document-origin /> -->
        <document-creation-date-element is-Trash value="Création" />
        <trash-document-restore
          @restore-icon-click="handleRestoreFileClickedByTab"
        />
        <trash-documents-actions-element
          @restore-clicked="handleRestoreFileClickedByMenu"
        />
      </template>
    </natto-table>
    <restore-file-modal-confirmation
      v-model="fileRestoreModalState.isRestoreFileModalConfirmationOpened"
      :document-id="fileRestoreModalState.documentId"
      @restore-confirm="$emit('restore-document', $event)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import NattoTable, {
  ElementPlusTablePayload
} from '@/Common/components/Table/NattoTable.vue'

import TrashDocuments from '@/modules/Trash/models/Inputs/TrashDocuments'
import DocumentTypeElement from '@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentTypeElement.vue'
import DocumentNameElement from '@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentNameElement.vue'
import DocumentCreationDateElement from '@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentCreationDateElement.vue'
import TrashDocumentRestore from '@/modules/Trash/components/TrashDocumentsTableElements/TrashDocumentRestore.vue'
import TrashDocumentsActionsElement from '@/modules/Trash/components/TrashDocumentsTableElements/TrashDocumentsActionsElement.vue'
import RestoreFileModalConfirmation from '@/modules/Trash/components/Modals/RestoreFileModalConfirmation.vue'
import { trackEventFactory } from '@/Common/helpers/analyticsLog'
import analyticsCode from '@/Common/constants/analyticsCode'
import { useStore } from 'vuex'
import useTrashModule from '@/modules/Trash/store/helpers'

export default defineComponent({
  name: 'TrashDocumentsTable',
  components: {
    DocumentCreationDateElement,
    DocumentNameElement,
    DocumentTypeElement,
    NattoTable,
    TrashDocumentsActionsElement,
    TrashDocumentRestore,
    RestoreFileModalConfirmation
  },
  props: {
    documents: {
      type: TrashDocuments,
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
    pageNumber: {
      type: Number,
      default: 1
    }
  },
  emits: ['page-opened', 'restore-document'],
  setup(props, { emit }) {
    const store = useStore()
    const { isInPendingList } = useTrashModule(store)

    const handlePageOpened = (pageNumber: number) => {
      emit('page-opened', pageNumber)
    }

    const fileRestoreModalState = reactive({
      isRestoreFileModalConfirmationOpened: false,
      documentId: ''
    })

    const trashDocumentRowClass = ({
      row
    }: ElementPlusTablePayload): string => {
      return isInPendingList(row.id) ? 'row--disabled' : ''
    }

    const handleRestoreFileClickedByTab = (documentId: string) => {
      if (!isInPendingList(documentId)) {
        trackEventFactory(analyticsCode['tdv-tab-restore'])
        handleRestoreFileClicked(documentId)
      }
    }

    const handleRestoreFileClickedByMenu = (documentId: string) => {
      if (!isInPendingList(documentId)) {
        trackEventFactory(analyticsCode['tdv-menu-restore'])
        handleRestoreFileClicked(documentId)
      }
    }

    const handleRestoreFileClicked = (documentId: string) => {
      fileRestoreModalState.documentId = documentId
      fileRestoreModalState.isRestoreFileModalConfirmationOpened = true
    }

    const areDocumentsLoading = computed(() => {
      return props.documents.state === 'loading'
    })

    return {
      handlePageOpened,
      fileRestoreModalState,
      handleRestoreFileClickedByTab,
      handleRestoreFileClickedByMenu,
      areDocumentsLoading,
      trashDocumentRowClass
    }
  }
})
</script>

<style lang="scss">
.trash-documents-table {
  th:nth-child(6) {
    text-align: center !important;
  }
  .row--disabled,
  .row--disabled:hover {
    opacity: 0.3;
    background-color: transparent !important;
  }
}
</style>
