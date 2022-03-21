import { TrashDocumentAPIMockList } from '../mocks/TrashDocumentAPIMock'
import getters from '@/modules/Trash/store/getters'
import TrashDocumentsPaginator from '@/modules/Trash/models/Query/TrashDocumentsPaginator'
import TrashDocuments from '@/modules/Trash/models/Inputs/TrashDocuments'
import { TrashStateInterface } from '@/modules/Trash/store/state'
import { createTrashStoreMock } from 'tests/unit/__mocks__/storeMock/createTrashStoreMock'
import { RestorationStatus } from '@/modules/Trash/models/Inputs/TrashDocument'

let storeMock = createTrashStoreMock()

describe('trash-store-getters', () => {
  beforeEach(() => {
    storeMock = createTrashStoreMock()
    storeMock.state.GED.Trash.paginator = new TrashDocumentsPaginator({
      pageNumber: 1,
      itemsPerPage: 10,
      totalItems: 20
    })
    storeMock.state.GED.Trash.documents = TrashDocuments.loaded(
      TrashDocumentAPIMockList
    )
    storeMock.state.GED.Trash.documentsTotalCount = 20
  })
  test('documents', () => {
    expect(getters.documents(storeMock.state.GED.Trash)).toEqual(
      storeMock.state.GED.Trash.documents
    )
  })
  test('pendingList', () => {
    expect(getters.pendingList(storeMock.state.GED.Trash)).toEqual(
      storeMock.state.GED.Trash.pendingList
    )
  })
  test('totalPendingRestoration', () => {
    expect(getters.totalPendingRestoration(storeMock.state.GED.Trash)).toEqual(
      storeMock.state.GED.Trash.totalPendingRestoration
    )
  })
  test('documentsTotalCount', () => {
    expect(getters.documentsTotalCount(storeMock.state.GED.Trash)).toEqual(
      storeMock.state.GED.Trash.documentsTotalCount
    )
  })
  test('paginator', () => {
    expect(getters.paginator(storeMock.state.GED.Trash)).toEqual(
      storeMock.state.GED.Trash.paginator
    )
  })

  test('areAllDocumentsLoaded-when-are-loaded', () => {
    expect(getters.areAllDocumentsLoaded(storeMock.state.GED.Trash)).toEqual(
      false
    )
  })

  test('areAllDocumentsLoaded-when-are-not-loaded', () => {
    storeMock.state.GED.Trash.paginator.totalItems = 150

    expect(getters.areAllDocumentsLoaded(storeMock.state.GED.Trash)).toEqual(
      false
    )
  })

  describe('isFileRestoring', () => {
    const restoringCases = [
      { isFileRestoring: false, expected: false },
      { isFileRestoring: true, expected: true }
    ]

    it.each(restoringCases)(
      'is should return $expected if isFolderDeleting = $isFolderDeleting',
      ({ isFileRestoring, expected }) => {
        const state = {
          isFileRestoring
        } as TrashStateInterface

        expect(getters.isFileRestoring(state)).toBe(expected)
      }
    )
  })

  describe('isInPendingList', () => {
    const cases = [
      {
        trashDocumentId: '2705',
        restorationStatus: 'InProgress' as RestorationStatus,
        expectedIsInPendingList: true
      },
      {
        trashDocumentId: '1501',
        restorationStatus: 'InProgress' as RestorationStatus,
        expectedIsInPendingList: false
      },
      {
        trashDocumentId: '2705',
        restorationStatus: 'Failed' as RestorationStatus,
        expectedIsInPendingList: false
      }
    ]

    it.each(cases)(
      'isPendingList cases',
      ({ restorationStatus, trashDocumentId, expectedIsInPendingList }) => {
        const pendingList = TrashDocuments.loaded([
          {
            id: trashDocumentId,
            account: {
              id: '454',
              name: 'Columbo'
            },
            name: 'The document in progress',
            deleted: '2020-10-05',
            deletedBy: 'Sina',
            path: ['/Kpmg/Achats'],
            folderId: 8754
          }
        ])

        const state = {
          pendingList
        } as TrashStateInterface

        state.pendingList.collection[0].restorationStatus = restorationStatus

        expect(getters.isInPendingList(state)('2705')).toBe(
          expectedIsInPendingList
        )
      }
    )
  })
})
