import { TrashDocumentFromAPI } from '@/Common/types/document'

export type RestorationStatus = 'InProgress' | 'Failed' | ''

export default class TrashDocument {
  id: string | null
  name: string
  deleted: string
  deletedBy: string
  path: string[]
  restorationStatus: string
  folderId: number

  constructor(
    {
      id = null,
      name = '',
      deleted = '',
      deletedBy = '',
      path = [],
      folderId = 0
    } = {} as TrashDocumentFromAPI
  ) {
    this.id = id
    this.name = name
    this.deleted = deleted
    this.path = Array.isArray(path) ? path : [path]
    this.deletedBy = deletedBy
    this.restorationStatus = '' as RestorationStatus
    this.folderId = folderId
  }
}
