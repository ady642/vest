import RootStateInterface from '@/store/types/rootState'
import { Store } from 'vuex'
import { searchModule } from '@/modules/Search/store'

const addFetchDocumentsSubscriber = (
  store: Store<RootStateInterface>
): (() => void) => {
  return store.subscribeAction((action) => {
    if (
      action.type === searchModule('fetchDocuments') ||
      action.type === searchModule('fetchAndPushDocuments')
    ) {
      store.state.GED.Search.documents.cancelToken?.cancel()
    }
  })
}

const subscriptionHelpers = (): subscriptionHelpersType => ({
  addFetchDocumentsSubscriber
})

export default subscriptionHelpers

export type subscriptionHelpersType = {
  addFetchDocumentsSubscriber: (store: Store<RootStateInterface>) => () => void
}
