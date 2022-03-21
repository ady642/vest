import Document from '@/modules/Search/models/Documents/Inputs/Document'

import { DocumentFromAPI } from '@/Common/types/document'

export type DocumentsParamsConstructor = {
  cancelToken?: any
  state: 'loaded' | 'loading' | 'errored'
  collectionFromAPI: DocumentFromAPI[]
}

export default class Documents {
  cancelToken: any
  state: 'loaded' | 'loading' | 'errored'
  collection: Document[]

  constructor(
    { state, collectionFromAPI, cancelToken } = {} as DocumentsParamsConstructor
  ) {
    this.state = state
    this.collection =
      collectionFromAPI.length > 0
        ? collectionFromAPI.map(
            (document: DocumentFromAPI) => new Document(document)
          )
        : []

    this.cancelToken = cancelToken
  }

  static loaded(collectionFromAPI: DocumentFromAPI[]): Documents {
    return new Documents({ state: 'loaded', collectionFromAPI })
  }

  static loading(cancelToken: any): Documents {
    return new Documents({
      state: 'loading',
      collectionFromAPI: [],
      cancelToken
    })
  }

  static errored(): Documents {
    return new Documents({
      state: 'errored',
      collectionFromAPI: []
    })
  }

  get isLoading(): boolean {
    return this.state === 'loading'
  }

  updateDocumentComment(id: string, comment: string): void {
    this.collection = this.collection.map((document) => {
      if (document.id === id) {
        document.comments = comment
      }

      return document
    })
  }
}
