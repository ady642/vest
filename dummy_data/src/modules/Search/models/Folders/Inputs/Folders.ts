import Folder from '@/modules/Search/models/Folders/Inputs/Folder'

import { Category, CategoriesParamsConstructor } from '@/modules/Search/types'
import useArrayHelpers from '@/Common/hooks/useArrayHelpers'

export default class Folders {
  state: 'loaded' | 'loading' | 'errored'
  collection: Folder[]

  constructor(
    { state, collectionFromAPI } = {} as CategoriesParamsConstructor
  ) {
    this.state = state
    this.collection =
      collectionFromAPI.length > 0
        ? collectionFromAPI.map((folder: Category) => new Folder(folder))
        : []
  }

  getFolderById(id: number): Folder | undefined {
    const { findDeep } = useArrayHelpers()

    return findDeep(this.collection, id)
  }

  getFolderDeepLevel(id: number): number {
    const { countDeep } = useArrayHelpers()

    return countDeep(this.collection, id)
  }

  getFolderByName(name: string): Folder | undefined {
    const { findDeepByName } = useArrayHelpers()

    return findDeepByName(this.collection, name)
  }

  removeFolder(id: number): void {
    const { removeFolder } = useArrayHelpers()

    this.collection = removeFolder(this.collection, id)
  }

  getDefaultUploadFolderById(id: number): Folder | undefined {
    const { findDefaultUploadFolder } = useArrayHelpers()
    const folder = this.getFolderById(id)
    const children = folder?.children
    const defaultFolder = findDefaultUploadFolder(children as Folder[])

    return defaultFolder || children?.[0]
  }

  getShortcutsFolder(id: number): Folder[] | undefined {
    const { findShortcutFolders } = useArrayHelpers()

    const folder = this.getFolderById(id)

    if (folder) return findShortcutFolders(folder, [] as Folder[])
  }

  static loaded(collectionFromAPI: Category[]): Folders {
    return new Folders({ state: 'loaded', collectionFromAPI })
  }

  static loading(): Folders {
    return new Folders({ state: 'loading', collectionFromAPI: [] })
  }

  static errored(): Folders {
    return new Folders({ state: 'errored', collectionFromAPI: [] })
  }

  get isLoading(): boolean {
    return this.state === 'loading'
  }
}
