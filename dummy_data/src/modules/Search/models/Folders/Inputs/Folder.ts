import { Category, PermissionsNames } from '@/modules/Search/types'
import useArrayHelpers from '@/Common/hooks/useArrayHelpers'

const { sortArrayByAlphabeticalOrder } = useArrayHelpers()

export default class Folder {
  id: number | null
  name: string
  parentId: number | null
  children: Folder[]
  properties: {
    defaultUpload?: boolean
    syncStatus?: string
    isShortcut?: string
    folderDescription?: string
    tracingName?: string
  }
  permissions: PermissionsNames[]

  constructor(category: Category) {
    this.id = category.id
    this.name = category.name
    this.parentId = category.parent?.id
    this.children =
      category.children?.length > 0
        ? sortArrayByAlphabeticalOrder(
            category.children?.map((c) => new Folder(c)),
            'name'
          )
        : []
    this.properties = category.properties
    this.permissions = category.permissions
  }

  getCategory(): Category {
    return {
      id: this.id ? this.id : 0,
      name: this.name,
      parent: {
        id: this.parentId ? this.parentId : 0
      },
      children: this.children.map((c) => c.getCategory()),
      properties: this.properties,
      permissions: this.permissions
    }
  }

  hasChildrenByName(folderName: string): boolean {
    return this.children.some(
      (child) => child.name.toUpperCase() === folderName.toUpperCase()
    )
  }
  setChildren(children: Folder[]): void {
    this.children = children
  }
}
