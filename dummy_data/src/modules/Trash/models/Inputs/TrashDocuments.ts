import { TrashDocumentFromAPI } from '@/Common/types/document'
import TrashDocument from '@/modules/Trash/models/Inputs/TrashDocument'

export type TrashDocumentsParamsConstructor = {
  cancelToken?: any
  state: 'loaded' | 'loading' | 'errored'
  collectionFromAPI: TrashDocumentFromAPI[]
}

export default class TrashDocuments {
  cancelToken: any
  state: 'loaded' | 'loading' | 'errored'
  collection: TrashDocument[]

  constructor(
    {
      state,
      collectionFromAPI,
      cancelToken
    } = {} as TrashDocumentsParamsConstructor
  ) {
    this.state = state
    this.collection =
      collectionFromAPI.length > 0
        ? collectionFromAPI.map(
            (document: TrashDocumentFromAPI) => new TrashDocument(document)
          )
        : []
    this.cancelToken = cancelToken
  }

  static loaded(collectionFromAPI: TrashDocumentFromAPI[]): TrashDocuments {
    return new TrashDocuments({ state: 'loaded', collectionFromAPI })
  }

  static loading(cancelToken: any): TrashDocuments {
    return new TrashDocuments({
      state: 'loading',
      collectionFromAPI: [],
      cancelToken
    })
  }

  static errored(): TrashDocuments {
    return new TrashDocuments({ state: 'errored', collectionFromAPI: [] })
  }

  get isLoading(): boolean {
    return this.state === 'loading'
  }
}
