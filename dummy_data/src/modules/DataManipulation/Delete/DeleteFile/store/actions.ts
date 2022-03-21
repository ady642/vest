import { ActionContext } from 'vuex'
import { SearchStateInterface } from '@/modules/Search/store/types'
import RootSearchStateInterface from '@/store/types/rootState'
import DeleteFileServices from '@/modules/DataManipulation/Delete/DeleteFile/services'
import { SET_IS_FILE_DELETING } from '@/modules/DataManipulation/Delete/DeleteFile/store/mutations'

const deleteFiles = async (
  {
    rootState,
    commit
  }: Omit<
    ActionContext<SearchStateInterface, RootSearchStateInterface>,
    'getters' | 'rootGetters' | 'dispatch' | 'state'
  >,
  documentIds: string[]
): Promise<void> => {
  try {
    commit(SET_IS_FILE_DELETING, true)

    await DeleteFileServices.DeleteFiles(
      rootState.app.account.AccountId,
      documentIds
    )
  } finally {
    commit(SET_IS_FILE_DELETING, false)
  }
}

export default {
  deleteFiles
}
