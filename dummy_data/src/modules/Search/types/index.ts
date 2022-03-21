export type CategoriesParamsConstructor = {
  state: 'loaded' | 'loading' | 'errored'
  collectionFromAPI: Category[]
}

export type Category = {
  id: number
  name: string
  parent: Parent
  children: Category[]
  properties: {
    defaultUpload?: boolean
    syncStatus?: string
    isShortcut?: string
    folderDescription?: string
    tracingName?: string
  }
  permissions: PermissionsNames[]
}

export type PermissionsNames =
  | 'CAN_DELETE_FOLDER'
  | 'CAN_CREATE_FOLDER'
  | 'CAN_UPLOAD_FILES'
  | 'CAN_DELETE_FILES'

export type Parent = {
  id: number
}

export type CreateFolderQuery = {
  targetFolder: number
  folderName: string
  accountNumber: string
}
