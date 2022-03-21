import Documents from '@/modules/Search/models/Documents/Inputs/Documents'
import DocumentsPaginator from '@/modules/Search/models/Documents/Query/DocumentsPaginator'
import DocumentsFilters from '@/modules/Search/models/Documents/Query/DocumentsFilters'
import DocumentsSortOptions from '@/modules/Search/models/Documents/Query/DocumentsSortOptions'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'

export interface SearchStateInterface {
  documents: Documents
  documentsTotalCount: number
  folders: Folders
  paginator: DocumentsPaginator
  filters: DocumentsFilters
  sortOptions: DocumentsSortOptions
  previewDocumentImage?: Blob
  isPreviewLoading: boolean
  multipleDownloadLoading: boolean
  isDownloading: boolean
  visualization: Blob
}
