interface PatchCommentQueryParams {
  documentId: string
  value: string
}

export type PatchCommentQueryAPI = PatchCommentQueryParams

class PatchCommentQuery {
  documentId: string
  value: string

  constructor({ documentId, value } = {} as PatchCommentQueryParams) {
    this.documentId = documentId
    this.value = value
  }
}

export default PatchCommentQuery
