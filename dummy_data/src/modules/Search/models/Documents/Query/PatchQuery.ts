interface PatchQueryParams {
  accountId?: string
  documentId: string
  operation: string
  path: string
  value: string
}

export type PatchQueryAPI = PatchQueryParams

class PatchQuery {
  accountId?: string
  documentId: string
  operation: string
  path: string
  value: string

  constructor(
    { accountId, documentId, operation, path, value } = {} as PatchQueryParams
  ) {
    this.accountId = accountId
    this.documentId = documentId
    this.operation = operation
    this.path = path
    this.value = value
  }
}

export default PatchQuery
