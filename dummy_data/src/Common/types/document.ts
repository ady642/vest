export type PropertiesFromAPI = {
  syncStatus: string
  'Total Excluding VAT'?: number
  'Scanner Source'?: string
  HasSubscribedToVault?: string
  ENDO?: string
}

export type DocumentFromAPI = {
  id: string
  name: string
  creationDate: string
  type: string
  isUploadedInGedLoop: boolean
  size: number
  comments: string
  account: {
    id: string
    name: string
  }
  folder: {
    id: number
    path: []
  }
  content: {
    href: string
  }
  preview: {
    href: string
  }
  properties: PropertiesFromAPI
  created: string
  createdBy: string
  updated: string
  updatedBy: string
  restorationStatus: string
  folderId: number
  lifecycleStatus: number
}

export type TrashDocumentFromAPI = {
  id: string
  name: string
  deleted: string
  deletedBy: string
  path: string[]
  account: {
    id: string
    name: string
  }
  folderId: number
}
