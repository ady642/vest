import DocumentServices from '@/modules/Search/services'
import { SearchStateInterface } from '@/modules/Search/store/types'
import { ActionContext } from 'vuex'
import RootSearchStateInterface from '@/store/types/rootState'
import { SET_FOLDERS } from '@/modules/Search/store/mutations'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'

const fetchFolders = async ({
  commit,
  rootState
}: Omit<
  ActionContext<SearchStateInterface, RootSearchStateInterface>,
  'dispatch' | 'getters' | 'rootGetters'
>): Promise<void> => {
  commit(SET_FOLDERS, Folders.loading())

  try {
    const { data } = await DocumentServices.fetchFolders(
      rootState.app.account.AccountId
    )

    commit(SET_FOLDERS, Folders.loaded(data))
  } catch (e) {
    commit(SET_FOLDERS, Folders.errored())
  }
}

export default {
  fetchFolders
}
