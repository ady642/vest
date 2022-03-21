export default class FolderExistsError extends Error {
  code: number

  constructor() {
    super('This folder already exists')

    this.code = 403
  }
}
