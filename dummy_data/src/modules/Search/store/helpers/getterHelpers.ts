import { computed, ComputedRef } from 'vue'
import { Store } from 'vuex'
import Documents from '@/modules/Search/models/Documents/Inputs/Documents'
import { SearchStateInterface } from '@/modules/Search/store/types'
import { searchModule } from '@/modules/Search/store'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import DocumentsFilters from '@/modules/Search/models/Documents/Query/DocumentsFilters'
import DocumentsPaginator from '@/modules/Search/models/Documents/Query/DocumentsPaginator'
import DocumentsSortOptions from '@/modules/Search/models/Documents/Query/DocumentsSortOptions'
import RootStateInterface from '@/store/types/rootState'

const documents = (
  store: Store<SearchStateInterface>
): ComputedRef<Documents> =>
  computed(() => store.getters[searchModule('documents')])

const documentsTotalCount = (
  store: Store<SearchStateInterface>
): ComputedRef<number> =>
  computed(() => store.getters[searchModule('documentsTotalCount')])

const areAllDocumentsLoaded = (
  store: Store<SearchStateInterface>
): ComputedRef<boolean> =>
  computed(() => store.getters[searchModule('areAllDocumentsLoaded')])

const folders = (store: Store<SearchStateInterface>): ComputedRef<Folders> =>
  computed(() => store.getters[searchModule('folders')])

const filters = (
  store: Store<RootStateInterface>
): ComputedRef<DocumentsFilters> =>
  computed(() => store.getters[searchModule('filters')])

const paginator = (
  store: Store<SearchStateInterface>
): ComputedRef<DocumentsPaginator> =>
  computed(() => store.getters[searchModule('paginator')])

const sortOptions = (
  store: Store<SearchStateInterface>
): ComputedRef<DocumentsSortOptions> =>
  computed(() => store.getters[searchModule('sortOptions')])

const accountId = (store: Store<SearchStateInterface>): ComputedRef<string> =>
  computed(() => store.getters['app/account'])

const searchFolderId = (
  store: Store<RootStateInterface>
): ComputedRef<number> => computed(() => filters(store).value.folderId)

const getActiveFiltersCount = (
  store: Store<SearchStateInterface>
): ComputedRef<number> =>
  computed(() => store.getters[searchModule('activeFiltersCount')])

const searchActive = (
  store: Store<SearchStateInterface>
): ComputedRef<boolean> =>
  computed(() => store.getters[searchModule('searchActive')])

const getPreviewDocumentImage = (
  store: Store<SearchStateInterface>
): ComputedRef<Blob> =>
  computed(() => store.getters[searchModule('previewDocumentImage')])

const isPreviewLoading = (store: Store<SearchStateInterface>) =>
  computed(() => store.getters[searchModule('isPreviewLoading')])

const isMultipleDownloadLoading = (store: Store<RootStateInterface>) =>
  computed(() => store.getters[searchModule('multipleDownloadLoading')])

const isDownloading = (store: Store<RootStateInterface>) =>
  computed(() => store.getters[searchModule('isDownloading')])

const areAnyFilters = (store: Store<RootStateInterface>) =>
  computed(() => store.getters[searchModule('areAnyFilters')])

const visualization = (store: Store<RootStateInterface>) =>
  computed(() => store.getters[searchModule('visualization')])

const gettersHelpers = (): gettersHelpersType => ({
  documents,
  documentsTotalCount,
  areAllDocumentsLoaded,
  accountId,
  folders,
  filters,
  paginator,
  sortOptions,
  searchFolderId,
  getActiveFiltersCount,
  searchActive,
  getPreviewDocumentImage,
  isPreviewLoading,
  isMultipleDownloadLoading,
  isDownloading,
  areAnyFilters,
  visualization
})

export type gettersHelpersType = {
  documents: (store: Store<SearchStateInterface>) => ComputedRef<Documents>
  documentsTotalCount: (
    store: Store<SearchStateInterface>
  ) => ComputedRef<number>
  areAllDocumentsLoaded: (
    store: Store<SearchStateInterface>
  ) => ComputedRef<boolean>
  folders: (store: Store<SearchStateInterface>) => ComputedRef<Folders>
  accountId: (store: Store<SearchStateInterface>) => ComputedRef<string>
  filters: (store: Store<RootStateInterface>) => ComputedRef<DocumentsFilters>
  paginator: (
    store: Store<SearchStateInterface>
  ) => ComputedRef<DocumentsPaginator>
  sortOptions: (
    store: Store<SearchStateInterface>
  ) => ComputedRef<DocumentsSortOptions>
  searchFolderId: (store: Store<RootStateInterface>) => ComputedRef<number>
  getActiveFiltersCount: (
    store: Store<SearchStateInterface>
  ) => ComputedRef<number>
  searchActive: (store: Store<SearchStateInterface>) => ComputedRef<boolean>
  getPreviewDocumentImage: (
    store: Store<SearchStateInterface>
  ) => ComputedRef<Blob>
  isPreviewLoading: (store: Store<SearchStateInterface>) => ComputedRef<boolean>
  isMultipleDownloadLoading: (
    store: Store<RootStateInterface>
  ) => ComputedRef<boolean>
  isDownloading: (store: Store<RootStateInterface>) => ComputedRef<boolean>
  areAnyFilters: (store: Store<RootStateInterface>) => ComputedRef<boolean>
  visualization: (store: Store<RootStateInterface>) => ComputedRef<Blob>
}

export default gettersHelpers
