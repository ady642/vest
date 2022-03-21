interface CreateFolderQuery {
  parentId: number
  name: string
}

export default class CreateFolderInput {
  parentId: number
  name: string

  constructor(parentId: number, name: string) {
    this.parentId = parentId
    this.name = name
  }

  transformForAPI(): CreateFolderQuery {
    return {
      parentId: this.parentId,
      name: this.name.trim()
    }
  }
}
