import Documents from '@/modules/Search/models/Documents/Inputs/Documents'
import { SearchStateInterface } from '@/modules/Search/store/types'
import DocumentsFilters from '@/modules/Search/models/Documents/Query/DocumentsFilters'
import DocumentsSortOptions from '@/modules/Search/models/Documents/Query/DocumentsSortOptions'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import DocumentsPaginator from '@/modules/Search/models/Documents/Query/DocumentsPaginator'

const state: SearchStateInterface = {
  documents: Documents.loaded([]),
  documentsTotalCount: 0,
  folders: Folders.loaded([]),
  filters: new DocumentsFilters(),
  sortOptions: new DocumentsSortOptions(),
  paginator: new DocumentsPaginator(),
  previewDocumentImage: new Blob([]),
  isPreviewLoading: false,
  multipleDownloadLoading: false,
  isDownloading: false,
  visualization: new Blob([])
}

export default state
