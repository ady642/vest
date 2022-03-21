import Trash from '@/modules/Trash/store'
import RootStateInterface from '@/store/types/rootState'
import { createStore, Store } from 'vuex'
import dispatchHelpers from '@/modules/Trash/store/helpers/dispatchHelpers'
import Paginator from '@/Common/models/List/Paginator'

let storeMock: Store<RootStateInterface> = createStore({
  modules: {
    Trash: {
      namespaced: true,
      state: {
        trash: {
          ...Trash
        }
      }
    }
  }
})

describe('dispatchHelpers', () => {
  beforeEach(() => {
    storeMock = createStore({
      modules: {
        Trash: {
          namespaced: true,
          state: {
            trash: {
              ...Trash
            }
          }
        }
      }
    })
    storeMock.dispatch = jest.fn()
  })
  test('fetchTrashDocuments', () => {
    const { fetchTrashDocuments } = dispatchHelpers(storeMock)

    fetchTrashDocuments()
    expect(storeMock.dispatch).toBeCalledWith('GED/Trash/fetchTrashDocuments')
  })

  test('fetchAndPushTrashDocuments', () => {
    const { fetchAndPushTrashDocuments } = dispatchHelpers(storeMock)

    fetchAndPushTrashDocuments()
    expect(storeMock.dispatch).toBeCalledWith(
      'GED/Trash/fetchAndPushTrashDocuments'
    )
  })

  test('fetchTrashDocumentsTotalCount', () => {
    const { fetchTrashDocumentsTotalCount } = dispatchHelpers(storeMock)

    fetchTrashDocumentsTotalCount()
    expect(storeMock.dispatch).toBeCalledWith(
      'GED/Trash/fetchTrashDocumentsTotalCount'
    )
  })

  test('setTrashPaginator', () => {
    const { setTrashPaginator } = dispatchHelpers(storeMock)

    setTrashPaginator(
      new Paginator({ pageNumber: 1, itemsPerPage: 10, totalItems: 100 })
    )
    expect(storeMock.dispatch).toBeCalledWith('GED/Trash/setTrashPaginator', {
      itemsPerPage: 10,
      pageNumber: 1,
      totalItems: 100
    })
  })

  test('restoreFileByModal', () => {
    const { restoreFileByModal } = dispatchHelpers(storeMock)

    restoreFileByModal('1122')
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      'GED/Trash/restoreFileByModal',
      '1122'
    )
  })
})
