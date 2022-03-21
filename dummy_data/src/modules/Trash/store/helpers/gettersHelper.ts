import { Store } from 'vuex'
import { trashModule } from '@/modules/Trash/store'
import { computed, ComputedRef } from 'vue'
import TrashDocuments from '@/modules/Trash/models/Inputs/TrashDocuments'
import TrashDocumentsPaginator from '@/modules/Trash/models/Query/TrashDocumentsPaginator'
import RootStateInterface from '@/store/types/rootState'

const documents = (
  store: Store<RootStateInterface>
): ComputedRef<TrashDocuments> =>
  computed(() => store.getters[trashModule('documents')])

const documentsTotalCount = (
  store: Store<RootStateInterface>
): ComputedRef<number> =>
  computed(() => store.getters[trashModule('documentsTotalCount')])

const areAllDocumentsLoaded = (
  store: Store<RootStateInterface>
): ComputedRef<boolean> =>
  computed(() => store.getters[trashModule('areAllDocumentsLoaded')])

const paginator = (
  store: Store<RootStateInterface>
): ComputedRef<TrashDocumentsPaginator> =>
  computed(() => store.getters[trashModule('paginator')])

const totalLoading = (store: Store<RootStateInterface>): ComputedRef<boolean> =>
  computed(() => store.getters[trashModule('totalLoading')])

const isFileRestoring = (
  store: Store<RootStateInterface>
): ComputedRef<boolean> =>
  computed(() => store.getters[trashModule('isFileRestoring')])

const pendingList = (
  store: Store<RootStateInterface>
): ComputedRef<TrashDocuments> =>
  computed(() => store.getters[trashModule('pendingList')])

const totalPendingRestoration = (
  store: Store<RootStateInterface>
): ComputedRef<number> =>
  computed(() => {
    return store.getters[trashModule('totalPendingRestoration')]
  })

const isInPendingList = (
  store: Store<RootStateInterface>,
  trashDocumentId: string
): boolean => store.getters[trashModule('isInPendingList')](trashDocumentId)

export type gettersHelpersType = {
  documents: () => ComputedRef<TrashDocuments>
  documentsTotalCount: () => ComputedRef<number>
  areAllDocumentsLoaded: () => ComputedRef<boolean>
  paginator: () => ComputedRef<TrashDocumentsPaginator>
  totalLoading: () => ComputedRef<boolean>
  isFileRestoring: () => ComputedRef<boolean>
  pendingList: () => ComputedRef<TrashDocuments>
  totalPendingRestoration: () => ComputedRef<number>
  isInPendingList: (trashDocumentId: string) => boolean
}

const gettersHelpers = (
  store: Store<RootStateInterface>
): gettersHelpersType => ({
  documents: () => documents(store),
  documentsTotalCount: () => documentsTotalCount(store),
  areAllDocumentsLoaded: () => areAllDocumentsLoaded(store),
  paginator: () => paginator(store),
  totalLoading: () => totalLoading(store),
  isFileRestoring: () => isFileRestoring(store),
  pendingList: () => pendingList(store),
  totalPendingRestoration: () => totalPendingRestoration(store),
  isInPendingList: (trashDocumentId: string) =>
    isInPendingList(store, trashDocumentId)
})

export default gettersHelpers
