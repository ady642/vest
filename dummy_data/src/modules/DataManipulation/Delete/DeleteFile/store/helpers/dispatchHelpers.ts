import { Store } from 'vuex'
import { deleteFileModule } from '@/modules/DataManipulation/Delete/DeleteFile/store'
import RootStateInterface from '@/store/types/rootState'

const dispatchHelpers = (
  store: Store<RootStateInterface>
): dispatchHelpersType => ({
  deleteFile: async (documentId) => {
    await store.dispatch(deleteFileModule('deleteFiles'), [documentId])
  },
  deleteFiles: async (documentIds) => {
    await store.dispatch(deleteFileModule('deleteFiles'), documentIds)
  }
})

export type dispatchHelpersType = {
  deleteFile: (documentId: string) => Promise<void>
  deleteFiles: (documentIds: string[]) => Promise<void>
}

export default dispatchHelpers
