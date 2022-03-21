import Trash from '@/modules/Trash/store'
import RootStateInterface from '@/store/types/rootState'
import { createStore, Store } from 'vuex'
import gettersHelper from '@/modules/Trash/store/helpers/gettersHelper'
import TrashDocuments from '@/modules/Trash/models/Inputs/TrashDocuments'
import TrashDocumentsPaginator from '@/modules/Trash/models/Query/TrashDocumentsPaginator'
import { createTrashStoreMock } from 'tests/unit/__mocks__/storeMock/createTrashStoreMock'
import { TrashDocumentAPILightMockList } from '../../mocks/TrashDocumentAPIMock'

let storeMock = createTrashStoreMock()
const documentsData = TrashDocuments.loaded(TrashDocumentAPILightMockList)

describe('gettersHelpers', () => {
  beforeEach(() => {
    storeMock = createTrashStoreMock()

    storeMock.state.GED.Trash.documents = documentsData
    storeMock.state.GED.Trash.documentsTotalCount = 4
    storeMock.state.GED.Trash.paginator = new TrashDocumentsPaginator({
      pageNumber: 1,
      itemsPerPage: 10,
      totalItems: 100
    })
  })
  test('documents', () => {
    const { documents } = gettersHelper(storeMock)

    expect(documents().value).toEqual(storeMock.state.GED.Trash.documents)
  })

  test('documentsTotalCount', () => {
    const { documentsTotalCount } = gettersHelper(storeMock)

    expect(documentsTotalCount().value).toEqual(1905)
  })

  test('paginator', () => {
    const { paginator } = gettersHelper(storeMock)

    expect(paginator().value).toEqual(storeMock.state.GED.Trash.paginator)
  })

  test('areAllDocumentsLoaded', () => {
    const { areAllDocumentsLoaded } = gettersHelper(storeMock)

    expect(areAllDocumentsLoaded().value).toBe(false)
  })
})
