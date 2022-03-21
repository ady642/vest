import { ActionContext } from 'vuex'
import { SearchStateInterface } from '@/modules/Search/store/types'
import RootSearchStateInterface from '@/store/types/rootState'
import DeleteFolderServices from '@/modules/DataManipulation/Delete/DeleteFolder/services'
import { REMOVE_FOLDER } from '@/modules/Search/store/mutations'
import { SET_IS_FOLDER_DELETING } from '@/modules/DataManipulation/Delete/DeleteFolder/store/mutations'
import { searchModule } from '@/modules/Search/store'

const deleteFolderByModal = async (
  {
    commit,
    rootState
  }: Omit<
    ActionContext<SearchStateInterface, RootSearchStateInterface>,
    'dispatch' | 'getters' | 'rootGetters' | 'state'
  >,
  folderId: number
): Promise<void> => {
  try {
    commit(SET_IS_FOLDER_DELETING, true)

    await DeleteFolderServices.deleteFolder(
      rootState.app.account.AccountId,
      folderId
    )

    commit(searchModule(REMOVE_FOLDER), folderId, { root: true })
  } catch (error) {
    throw new Error(error)
  } finally {
    commit(SET_IS_FOLDER_DELETING, false)
  }
}

export default {
  deleteFolderByModal
}
