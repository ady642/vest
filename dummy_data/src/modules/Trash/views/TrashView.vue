<template>
  <arbo-view-layout>
    <template #documents-view-header>
      <trash-view-header />
    </template>
    <template #list-view>
      <div class="browse-documents display:flex">
        <trash-documents-table
          :documents="documents"
          :documents-per-page="paginator.itemsPerPage"
          :documents-total-in-folder-and-child="paginator.totalItems"
          :pageNumber="paginator.pageNumber"
          @page-opened="pageChanged"
          @restore-document="restoreDocumentHandler"
        />
      </div>
    </template>
  </arbo-view-layout>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import ArboViewLayout from '@/modules/Search/components/Layouts/ArboViewLayout.vue'
import TrashViewHeader from '@/modules/Trash/components/Header/TrashViewHeader.vue'
import TrashDocumentsTable from '@/modules/Trash/components/TrashDocumentsTable.vue'
import useTrashModule from '@/modules/Trash/store/helpers'
import TrashDocumentsPaginator from '@/modules/Trash/models/Query/TrashDocumentsPaginator'
import {
  pageViewFactory,
  trackEventFactory
} from '@/Common/helpers/analyticsLog'
import analyticsCode from '@/Common/constants/analyticsCode'

export default defineComponent({
  name: 'TrashView',
  components: {
    TrashDocumentsTable,
    TrashViewHeader,
    ArboViewLayout
  },

  setup() {
    pageViewFactory(analyticsCode['trashview-pgv'])
    const store = useStore()

    const {
      documents,
      paginator,
      setPage,
      fetchTrashDocuments,
      documentsTotalCount,
      setTrashPaginator,
      restoreFileByModal,
      pendingList
    } = useTrashModule(store)

    onBeforeMount(async () => {
      setTrashPaginator(new TrashDocumentsPaginator())
      await fetchTrashDocuments()
      trackEventFactory(
        analyticsCode['tdv-navigation-files'],
        0,
        documentsTotalCount().value
      )
    })

    const pageChanged = async (pageNumber: number) => {
      trackEventFactory(analyticsCode['tdv-paginate'], pageNumber)
      setPage(pageNumber)
      await fetchTrashDocuments()
    }

    const restoreDocumentHandler = async (documentId: string) => {
      await restoreFileByModal(documentId)
      if (
        documents().value.collection.length <= 1 &&
        paginator().value.pageNumber > 1
      ) {
        await pageChanged(paginator().value.pageNumber - 1)
      } else {
        await fetchTrashDocuments()
      }
    }

    return {
      documents: documents(),
      paginator: paginator(),
      documentsTotalCount: documentsTotalCount(),
      pageChanged,
      restoreDocumentHandler,
      pendingList: pendingList()
    }
  }
})
</script>
