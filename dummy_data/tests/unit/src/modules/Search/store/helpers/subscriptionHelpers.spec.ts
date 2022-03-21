import subscriptionHelpers from '@/modules/Search/store/helpers/subscriptionHelpers'
import Search, { searchModule } from '@/modules/Search/store'
import { createStore, Store } from 'vuex'
import RootStateInterface from '@/store/types/rootState'
import DataManipulation from '@/modules/DataManipulation/store'

let mockCancel = jest.fn()

const createSearchStoreMocked = ({
  mockCancel = jest.fn()
} = {}): Store<RootStateInterface> =>
  createStore({
    modules: {
      GED: {
        namespaced: true,
        modules: {
          Search: {
            ...Search,
            state: {
              ...Search.state,
              documents: {
                ...Search.state.documents,
                cancelToken: {
                  cancel: mockCancel
                }
              }
            }
          },
          DataManipulation
        }
      }
    }
  })

let store = createSearchStoreMocked({ mockCancel })

describe('subscriptionHelpers', () => {
  beforeEach(() => {
    mockCancel = jest.fn()
    store = createSearchStoreMocked({ mockCancel })
  })

  it('should cancel the request when fetchDocuments action is dispatched', async () => {
    subscriptionHelpers().addFetchDocumentsSubscriber(store)
    await store.dispatch(searchModule('fetchDocuments'))

    expect(mockCancel).toHaveBeenCalled()
  })
  it('should cancel the request when fetchAndPushDocuments action is dispatched', async () => {
    subscriptionHelpers().addFetchDocumentsSubscriber(store)
    await store.dispatch(searchModule('fetchAndPushDocuments'))

    expect(mockCancel).toHaveBeenCalled()
  })
  it('should not cancel the request when an other action is dispatched', async () => {
    subscriptionHelpers().addFetchDocumentsSubscriber(store)
    await store.dispatch(searchModule('fetchFolders'))

    expect(mockCancel).not.toHaveBeenCalled()
  })
})
