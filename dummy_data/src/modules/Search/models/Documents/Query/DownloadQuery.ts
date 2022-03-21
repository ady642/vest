interface DownloadQueryParams {
  accountId: string
  documentId: string
}

export type DownloadQueryAPI = DownloadQueryParams

class DownloadQuery {
  accountId: string
  documentId: string

  constructor({ accountId, documentId } = {} as DownloadQueryParams) {
    this.accountId = accountId
    this.documentId = documentId
  }

  transformForAPI(): DownloadQueryAPI {
    return {
      accountId: this.accountId,
      documentId: this.documentId
    }
  }
}

export default DownloadQuery
