import TrashServices from '@/modules/Trash/services'
import { TrashDocumentAPIMockList } from '../mocks/TrashDocumentAPIMock'
import actions from '@/modules/Trash/store/actions'
import RootStateInterface from '@/store/types/rootState'
import { Commit, Dispatch } from 'vuex'
import TrashDocumentsPaginator from '@/modules/Trash/models/Query/TrashDocumentsPaginator'
import TrashDocuments from '@/modules/Trash/models/Inputs/TrashDocuments'
import { createTrashStoreMock } from 'tests/unit/__mocks__/storeMock/createTrashStoreMock'
import { TrashDocumentAPILightMockList } from '../mocks/TrashDocumentAPIMock'
import constants from '@/Common/constants'
import { REMOVE_DOCUMENT_IN_PENDING_LIST } from '@/modules/Trash/store/mutations'

let commit: Commit = jest.fn()
let dispatch: Dispatch = jest.fn()
let storeMock = createTrashStoreMock()

const state = storeMock.state.GED.Trash
const documentsData = TrashDocuments.loaded(TrashDocumentAPILightMockList)

describe('trash-store-actions', () => {
  beforeEach(() => {
    storeMock = createTrashStoreMock()
    storeMock.state.GED.Trash.paginator = new TrashDocumentsPaginator({
      pageNumber: 1,
      itemsPerPage: 10,
      totalItems: 100
    })
    commit = jest.fn()
    dispatch = jest.fn()

    jest.spyOn(TrashServices, 'fetchTrashDocuments').mockReturnValue({
      data: TrashDocumentAPIMockList,
      headers: {
        'content-range': 'documents 1-10/1000'
      }
    } as never)
  })
  test('fetchTrashDocuments', async () => {
    await actions.fetchTrashDocuments({
      commit,
      dispatch,
      state: storeMock.state.GED.Trash,
      rootState: {
        app: {
          account: {
            AccountId: '75545'
          }
        }
      } as RootStateInterface
    })
    expect(commit).toHaveBeenNthCalledWith(1, 'SET_TRASH_DOCUMENTS', {
      cancelToken: { cancel: expect.anything(), token: 'the cancel token' },
      collection: [],
      state: 'loading'
    })
    expect(commit).toHaveBeenNthCalledWith(
      2,
      'SET_TRASH_DOCUMENTS',
      TrashDocuments.loaded(TrashDocumentAPIMockList)
    )
  })
  test('fetchTrashDocuments when exceptions', async () => {
    jest.clearAllMocks()
    jest.spyOn(TrashServices, 'fetchTrashDocuments').mockImplementation(() => {
      throw new Error('error')
    })

    await actions.fetchTrashDocuments({
      commit,
      dispatch,
      state: storeMock.state.GED.Trash,
      rootState: {
        app: {
          account: {
            AccountId: '75545'
          }
        }
      } as RootStateInterface
    })
    expect(commit).toHaveBeenNthCalledWith(1, 'SET_TRASH_DOCUMENTS', {
      cancelToken: { cancel: expect.anything(), token: 'the cancel token' },
      collection: [],
      state: 'loading'
    })
    expect(commit).toHaveBeenNthCalledWith(
      2,
      'SET_TRASH_DOCUMENTS',
      TrashDocuments.errored()
    )
  })

  test('fetchTrashDocumentsTotalCount', async () => {
    await actions.fetchTrashDocumentsTotalCount({
      commit,
      rootState: {
        app: {
          account: {
            AccountId: '75545'
          }
        }
      } as RootStateInterface
    })
    expect(commit).toHaveBeenCalledWith('SET_TRASH_DOCUMENTS_TOTAL_COUNT', 1000)
  })
  test('fetchTrashDocumentsTotalCount when exceptions', async () => {
    jest.clearAllMocks()
    jest.spyOn(TrashServices, 'fetchTrashDocuments').mockImplementation(() => {
      throw new Error('error')
    })

    const action = async () =>
      await actions.fetchTrashDocumentsTotalCount({
        commit,
        rootState: {
          app: {
            account: {
              AccountId: '75545'
            }
          }
        } as RootStateInterface
      })

    await expect(action()).rejects.toThrow('error')
  })

  test('setTrashPaginator', async () => {
    await actions.setTrashPaginator(
      {
        commit
      },
      new TrashDocumentsPaginator({
        pageNumber: 1,
        itemsPerPage: 10,
        totalItems: 100
      })
    )
    expect(commit).toHaveBeenCalledWith('SET_TRASH_PAGINATOR', {
      pageNumber: 1,
      itemsPerPage: 10,
      totalItems: 100
    })
  })

  describe('RestoreFile actions', () => {
    it('Should call RestoreFileServices.RestoreFile service', async () => {
      state.documents = documentsData
      const document = documentsData.collection[0]

      // Given the service return no value
      jest
        .spyOn(TrashServices, 'restoreFile')
        .mockResolvedValue({ data: document.id } as never)

      // When I call the restoreFileByModal action
      await actions.restoreFileByModal(
        {
          state,
          commit,
          dispatch,
          rootState: {
            app: {
              account: {
                AccountId: '75545'
              }
            }
          } as RootStateInterface
        },
        'cf28d738-8715-4d0f-b87e-2872f0d559ef'
      )
      // Then
      expect(dispatch).toBeCalledWith('pushInRestorePendingList', document)
      expect(dispatch).toBeCalledWith('GED/Search/fetchFolders', null, {
        root: true
      })
      expect(TrashServices.restoreFile).toBeCalledWith(
        '75545',
        'cf28d738-8715-4d0f-b87e-2872f0d559ef'
      )
      expect(commit).toHaveBeenCalledTimes(3)
      expect(commit).toHaveBeenCalledWith('SET_IS_FILE_RESTORING', true)
      expect(commit).toHaveBeenCalledWith(
        'REMOVE_DOCUMENT_IN_PENDING_LIST',
        'cf28d738-8715-4d0f-b87e-2872f0d559ef'
      )
      expect(commit).toHaveBeenCalledWith('SET_IS_FILE_RESTORING', false)
    })
    it('Should set document status in pending list when error is prouced', async () => {
      state.documents = documentsData

      // Given the service return no value

      jest.spyOn(TrashServices, 'restoreFile').mockImplementation(() => {
        throw new Error('bad-exception')
      })
      // When I call the restoreFileByModal action
      await actions.restoreFileByModal(
        {
          state,
          commit,
          dispatch,
          rootState: {
            app: {
              account: {
                AccountId: '75545'
              }
            }
          } as RootStateInterface
        },
        'cf28d738-8715-4d0f-b87e-2872f0d559ef'
      )
      // Then
      expect(dispatch).toBeCalledWith('setPendingListDocumentStatus', {
        documentId: 'cf28d738-8715-4d0f-b87e-2872f0d559ef',
        status: constants.RESTORE_FAILED
      })
    })
  })
  describe('pushInRestorePendingList', () => {
    it('Should push document and set document status', async () => {
      await actions.pushInRestorePendingList(
        { state, commit },
        documentsData.collection[0]
      )

      expect(commit).toBeCalledWith('SET_DOCUMENT_STATUS', {
        status: constants.RESTORE_IN_PROGRESS,
        documentId: documentsData.collection[0].id
      })
    })
  })

  describe('popFromRestorePendingList', () => {
    it('Should delete item from pendingList', async () => {
      state.pendingList = documentsData

      await actions.removeFromPendingList(
        { commit },
        'cf28d738-8715-4d0f-b87e-2872f0d559ef'
      )

      expect(commit).toHaveBeenCalledWith(
        REMOVE_DOCUMENT_IN_PENDING_LIST,
        'cf28d738-8715-4d0f-b87e-2872f0d559ef'
      )
    })
  })
  describe('setPendingListDocumentStatus', () => {
    it('Should commit SET_DOCUMENT_STATUS', async () => {
      storeMock = createTrashStoreMock()

      state.pendingList = documentsData

      await actions.setPendingListDocumentStatus(
        { state, commit },
        'cf28d738-8715-4d0f-b87e-2872f0d559ef',
        constants.RESTORE_FAILED
      )

      expect(commit).toBeCalledWith('SET_DOCUMENT_STATUS', {
        status: constants.RESTORE_FAILED,
        documentId: 'cf28d738-8715-4d0f-b87e-2872f0d559ef'
      })
    })
  })
})
