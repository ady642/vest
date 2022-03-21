import { DeleteFoldersStateInterface } from '@/modules/DataManipulation/Delete/DeleteFolder/store/state'
import { Store } from 'vuex'
import { deleteFoldersModule } from '@/modules/DataManipulation/Delete/DeleteFolder/store'

const dispatchHelpers = (
  store: Store<DeleteFoldersStateInterface>
): dispatchHelpersType => ({
  deleteFolderByModal: async (folderId) => {
    try {
      await store.dispatch(deleteFoldersModule('deleteFolderByModal'), folderId)
    } catch (e) {
      throw new Error(e)
    }
  }
})

export type dispatchHelpersType = {
  deleteFolderByModal: (folderId: number) => void
}

export default dispatchHelpers
