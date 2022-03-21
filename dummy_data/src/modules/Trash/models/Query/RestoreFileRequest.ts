export default class RestoreFileRequest {
  ids: string[]

  constructor(documentIds: string[]) {
    this.ids = documentIds
  }
}
