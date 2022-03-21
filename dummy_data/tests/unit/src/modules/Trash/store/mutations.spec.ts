import TrashDocumentsPaginator from '@/modules/Trash/models/Query/TrashDocumentsPaginator'
import TrashDocuments from '@/modules/Trash/models/Inputs/TrashDocuments'
import mutations, {
  SET_IS_FILE_RESTORING,
  SET_TRASH_DOCUMENTS,
  SET_TRASH_DOCUMENTS_TOTAL_COUNT,
  SET_TRASH_PAGINATOR,
  SET_DOCUMENT_STATUS,
  REMOVE_DOCUMENT_IN_PENDING_LIST
} from '@/modules/Trash/store/mutations'
import { createTrashStoreMock } from 'tests/unit/__mocks__/storeMock/createTrashStoreMock'

import { TrashStateInterface } from '@/modules/Trash/store/state'
import constants from '@/Common/constants'
import { TrashDocumentAPILightMockList } from '../mocks/TrashDocumentAPIMock'

let storeMock = createTrashStoreMock()
const documentsData = TrashDocuments.loaded(TrashDocumentAPILightMockList)

describe('trash-store-mutations', () => {
  beforeEach(() => {
    storeMock = createTrashStoreMock()
    storeMock.state.GED.Trash.paginator = new TrashDocumentsPaginator({
      pageNumber: 0,
      itemsPerPage: 0,
      totalItems: 0
    })
    storeMock.state.GED.Trash.documents = TrashDocuments.loaded([])

    storeMock.state.GED.Trash.documentsTotalCount = 0
  })
  test('SET_TRASH_DOCUMENTS', () => {
    mutations[SET_TRASH_DOCUMENTS](
      storeMock.state.GED.Trash,
      TrashDocuments.loading('cancelToken')
    )

    expect(storeMock.state.GED.Trash.documents).toEqual(
      TrashDocuments.loading('cancelToken')
    )
  })

  test('SET_TRASH_DOCUMENTS_TOTAL_COUNT', () => {
    mutations[SET_TRASH_DOCUMENTS_TOTAL_COUNT](storeMock.state.GED.Trash, 55)

    expect(storeMock.state.GED.Trash.documentsTotalCount).toEqual(55)
  })

  test('SET_TRASH_PAGINATOR', () => {
    mutations[SET_TRASH_PAGINATOR](
      storeMock.state.GED.Trash,
      new TrashDocumentsPaginator({
        pageNumber: 1,
        itemsPerPage: 10,
        totalItems: 100
      })
    )

    expect(storeMock.state.GED.Trash.paginator).toEqual({
      pageNumber: 1,
      itemsPerPage: 10,
      totalItems: 100
    })
  })

  it('SET_IS_FILE_RESTORING', () => {
    const state = {
      isFileRestoring: false
    } as TrashStateInterface

    mutations[SET_IS_FILE_RESTORING](state, true)

    expect(state.isFileRestoring).toEqual(true)
  })

  it('SET_DOCUMENT_STATUS', () => {
    const state = {
      pendingList: documentsData
    } as TrashStateInterface

    mutations[SET_DOCUMENT_STATUS](state, {
      status: constants.RESTORE_FAILED,
      documentId: 'cf28d738-8715-4d0f-b87e-2872f0d559ef'
    })

    expect(
      state.pendingList.collection.some(
        (document) => document.restorationStatus === constants.RESTORE_FAILED
      )
    ).toBe(true)
  })

  describe('REMOVE_DOCUMENT_FROM_PENDING_LIST', () => {
    let state = {} as TrashStateInterface

    beforeEach(() => {
      state = {
        pendingList: TrashDocuments.loaded([
          {
            id: 'cf28d738-8715-4d0f-b87e-2872f0d559ef',
            name: '12 - Tableaux des offres GED DS.xlsx',
            path: ['Comptabilité', 'KPMG', 'Publications'],
            deleted: '2021-08-26T07:21:57.303Z',
            deletedBy: 'Admin',
            account: {
              id: '93012cc8-77b9-4161-8dbd-61915d935e21',
              name: 'JEAN LéVAGE'
            },
            folderId: 1
          }
        ])
      } as TrashStateInterface
    })
    it('should throw an exception if documentId is null', () => {
      console.error = jest.fn()
      mutations[REMOVE_DOCUMENT_IN_PENDING_LIST](state, '')

      expect(console.error).toHaveBeenCalledWith('Document Id cant be empty')
    })
    it('should remove the document of the pendingList.collection state with the id passed in parameters', () => {
      const documentIdToRemove = 'cf28d738-8715-4d0f-b87e-2872f0d559ef'

      mutations[REMOVE_DOCUMENT_IN_PENDING_LIST](state, documentIdToRemove)

      expect(state.pendingList.collection).toEqual([])
    })
  })
})
