import Document, {
  LifeCycleStatus
} from '@/modules/Search/models/Documents/Inputs/Document'
import constants from '@/Common/constants'
import Properties from '@/modules/Search/models/Documents/Inputs/Properties'

export const DocumentMock: Document = {
  createdBy: '',
  id: 'myID',
  folderId: 45454,
  name: 'Mon bilan comptable',
  path: ['Some path'],
  creationDate: '2018-05-27',
  restorationStatus: 'InProgress',
  properties: new Properties({ syncStatus: constants.PENDING_SYNC }),
  size: 54354,
  updatedDate: '2018-05-27',
  type: 'jpg',
  preview: 'preview-href',
  lifecycleStatus: LifeCycleStatus.Treated,
  comments: '',
  get isTreated(): boolean {
    return true
  },
  get isNew(): boolean {
    return false
  },
  get isSync() {
    return false
  }
}
