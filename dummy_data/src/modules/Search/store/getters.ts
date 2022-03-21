import { SearchStateInterface } from '@/modules/Search/store/types'
import Documents from '@/modules/Search/models/Documents/Inputs/Documents'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import DocumentsFilters from '@/modules/Search/models/Documents/Query/DocumentsFilters'
import DocumentsSortOptions from '../models/Documents/Query/DocumentsSortOptions'
import DocumentsPaginator from '../models/Documents/Query/DocumentsPaginator'

const documents = (state: SearchStateInterface): Documents => state.documents
const documentsTotalCount = (state: SearchStateInterface): number =>
  state.documentsTotalCount
const areAllDocumentsLoaded = (state: SearchStateInterface): boolean =>
  state.documents.collection.length === state.paginator.totalItems
const folders = (state: SearchStateInterface): Folders => state.folders
const filters = (state: SearchStateInterface): DocumentsFilters => state.filters
const paginator = (state: SearchStateInterface): DocumentsPaginator =>
  state.paginator
const sortOptions = (state: SearchStateInterface): DocumentsSortOptions =>
  state.sortOptions
const searchActive = (state: SearchStateInterface): boolean =>
  state.filters.search.length > 0
const activeFiltersCount = (state: SearchStateInterface): number =>
  state.filters.GetActiveFiltersCount()
const areAnyFilters = (state: SearchStateInterface): boolean =>
  state.filters.areAnyFilters
const previewDocumentImage = (state: SearchStateInterface): Blob | undefined =>
  state.previewDocumentImage
const isPreviewLoading = (state: SearchStateInterface): boolean =>
  state.isPreviewLoading
const multipleDownloadLoading = (state: SearchStateInterface): boolean =>
  state.multipleDownloadLoading
const isDownloading = (state: SearchStateInterface): boolean =>
  state.isDownloading
const visualization = (state: SearchStateInterface): Blob => state.visualization

export default {
  documents,
  documentsTotalCount,
  areAllDocumentsLoaded,
  folders,
  filters,
  paginator,
  sortOptions,
  searchActive,
  activeFiltersCount,
  previewDocumentImage,
  isPreviewLoading,
  multipleDownloadLoading,
  isDownloading,
  areAnyFilters,
  visualization
}
