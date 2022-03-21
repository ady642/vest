import TrashDocuments from '../models/Inputs/TrashDocuments'
import TrashDocumentsPaginator from '../models/Query/TrashDocumentsPaginator'
import TrashSortOptions from '../models/Query/TrashSortOptions'
import { INotificationComponent } from '@/Common/helpers/NotificationComponent'

export interface TrashStateInterface {
  documents: TrashDocuments
  documentsTotalCount: number
  totalLoading: boolean
  paginator: TrashDocumentsPaginator
  sortOptions: TrashSortOptions
  restoreNotification: INotificationComponent
  isFileRestoring: boolean
  pendingList: TrashDocuments
  totalPendingRestoration: number
  isInPendingList: boolean
}

const state: TrashStateInterface = {
  documents: TrashDocuments.loaded([]),
  documentsTotalCount: 0,
  paginator: new TrashDocumentsPaginator(),
  sortOptions: new TrashSortOptions(),
  totalLoading: false,
  restoreNotification: {} as INotificationComponent,
  isFileRestoring: false,
  pendingList: TrashDocuments.loaded([]),
  totalPendingRestoration: 0,
  isInPendingList: false
}

export default state
