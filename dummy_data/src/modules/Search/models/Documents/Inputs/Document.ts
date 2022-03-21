import { DocumentFromAPI } from '@/Common/types/document'
import Properties from '@/modules/Search/models/Documents/Inputs/Properties'

export enum LifeCycleStatus {
  New = 1,
  Transmitted,
  Validated,
  Rejected,
  Double,
  PreparedPIA,
  Treated,
  NotTreated
}

export default class Document {
  id: string | null
  name: string
  type: string
  creationDate: string
  createdBy: string
  updatedDate: string
  path: string[]
  properties: Properties
  preview: string
  folderId: number
  restorationStatus: string
  size: number
  comments?: string
  lifecycleStatus?: LifeCycleStatus

  constructor(
    {
      id = null,
      name = '',
      type = '',
      created = '',
      createdBy = '',
      updated = '',
      folder = { id: 0, path: [] },
      properties = {
        syncStatus: '',
        restaurationStatus: ''
      },
      size = 0,
      comments = '',
      preview = { href: '' },
      lifecycleStatus
    } = {} as DocumentFromAPI
  ) {
    this.id = id
    this.name = name
    this.type = type
    this.creationDate = created
    this.createdBy = createdBy
    this.updatedDate = updated
    this.path = Array.isArray(folder.path) ? folder.path : [folder.path]
    this.properties = new Properties(properties)
    this.preview = preview.href
    this.folderId = folder.id
    this.restorationStatus = ''
    this.size = size
    this.comments = comments
    this.lifecycleStatus = lifecycleStatus
  }

  get isTreated(): boolean {
    return this?.lifecycleStatus === LifeCycleStatus.Treated
  }

  get isNew(): boolean {
    return this?.lifecycleStatus === LifeCycleStatus.New
  }

  get isSync(): boolean {
    return Boolean(this.properties) && Boolean(this.properties.syncStatus)
  }
}
